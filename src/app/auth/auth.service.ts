import {ConflictException, Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {UsersService} from '@app/services';
import {SignupDto} from './dto';
import {JwtService} from '@nestjs/jwt';
import {usersConstants} from '@app/constants/constants';
import {User} from '@app/entities/users.entity';
import {ConfigService} from '@nestjs/config';
import {Role} from '@app/entities';

@Injectable()
export class AuthService {
  constructor(
    @Inject(usersConstants.users_repository) private usersRepository: typeof User,
    @Inject(usersConstants.roles_repository) private rolesRepository: typeof Role,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async signUp(signUpData: SignupDto): Promise<{token: string; user: User}> {
    const {username, email, password} = signUpData;
    const existsUserByEmail = await this.usersService.findUserByEmail(email);
    const existsUserByUsername = await this.usersService.findUserByUsername(username);

    if (existsUserByEmail) {
      throw new ConflictException('email already registered');
    }

    if (existsUserByUsername) {
      throw new ConflictException('username already taken');
    }

    const saltRounds = this.configService.get<number>('auth.bcrypt.saltOrRounds');
    const hashed_password = await bcrypt.hashSync(password, saltRounds);

    const newUser = await this.usersRepository.create({
      ...signUpData,
      password: hashed_password,
    });

    const roles = await this.rolesRepository.findAll({where: {name: 'user'}});
    await newUser.$set('roles', roles);
    const token = this.generateToken(newUser);
    return {token, user: newUser};
  }

  public async login(loginDto): Promise<{accessToken: string; user: User}> {
    const {email, password} = loginDto;

    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatch = await bcrypt.compare(password, user?.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = this.generateToken(user);

    return {accessToken, user};
  }

  async validateUser(payload: any): Promise<User | null> {
    const user = await this.usersRepository.findByPk(payload.sub);
    if (!user) {
      return null;
    }

    return user;
  }

  private generateToken(user: User) {
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      roles: user.roles,
    };

    const token = this.jwtService.sign(payload);
    return token;
  }
}
