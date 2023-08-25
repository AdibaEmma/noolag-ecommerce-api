import {Controller, Post, Body, Inject, forwardRef, HttpCode, HttpStatus} from '@nestjs/common';
import {AuthService} from './auth.service';
import {ValidationService} from '@app/services';
import {LoginDto, SignupDto} from './dto';
import {User} from '@app/entities/users.entity';

@Controller()
export class AuthController {
  constructor(
    @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService,
    @Inject(forwardRef(() => ValidationService)) private readonly validationService: ValidationService,
  ) {}

  @Post('/signup')
  async signUp(@Body() signUpDto: SignupDto): Promise<{token: string; user: User}> {
    await this.validationService.validateDto<SignupDto>(SignupDto, signUpDto);
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<{accessToken}> {
    await this.validationService.validateDto<LoginDto>(LoginDto, loginDto);
    return this.authService.login(loginDto);
  }
}
