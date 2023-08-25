import {ConflictException, Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {UsersService} from '@app/services';
import {SignupDto} from './dto';
import {JwtService} from '@nestjs/jwt';
import {usersConstants} from '@app/constants/constants';
import {User} from '@app/entities/users.entity';
import {ConfigService} from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    @Inject(usersConstants.users_repository) private usersRepository: typeof User,
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

    const token = this.generateToken(newUser);
    return {token, user: newUser};
  }

  private generateToken(user: User) {
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
    };

    const token = this.jwtService.sign(payload);
    return token;
  }

  public async login(loginDto): Promise<{accessToken: string; user: User}> {
    const {email, password} = loginDto;

    const user = await this.usersService.findUserByEmail(email);
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = this.generateToken(user);

    return {accessToken, user};
  }
}
