import {Controller, Post, Body, Inject, forwardRef, HttpCode, HttpStatus} from '@nestjs/common';
import {AuthService} from './auth.service';
import {ValidationService} from '@app/services';
import {LoginDto, ResetPasswordDTO, SignupDto} from './dto';
import {User} from '@app/entities/users.entity';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('authentication')
@Controller()
export class AuthController {
  constructor(
    @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService,
    @Inject(forwardRef(() => ValidationService)) private readonly validationService: ValidationService,
  ) {}

  @Post('/signup')
  @ApiOperation({summary: 'User signup'})
  @ApiCreatedResponse({description: 'Registration successfully', type: User})
  @ApiResponse({status: 409, description: 'Conflict: Missing Field(s)'})
  @ApiUnprocessableEntityResponse({description: 'Bad Request: Validation Failed'})
  async signUp(@Body() signUpDto: SignupDto): Promise<{token: string; user: User}> {
    await this.validationService.validateDto<SignupDto>(SignupDto, signUpDto);
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  @ApiOperation({summary: 'User login'})
  @ApiOkResponse({description: 'Login successful', type: User})
  @ApiForbiddenResponse({description: 'Unauthorized Request'})
  async login(@Body() loginDto: LoginDto): Promise<{accessToken}> {
    await this.validationService.validateDto<LoginDto>(LoginDto, loginDto);
    return this.authService.login(loginDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/reset-password')
  @ApiOperation({summary: 'Reset User password'})
  @ApiOkResponse({description: 'Password reset successful'})
  @ApiForbiddenResponse({description: 'Unauthorized Request'})
  async resetPassword(@Body() resetPasswordDTO: ResetPasswordDTO): Promise<any> {
    await this.validationService.validateDto<ResetPasswordDTO>(ResetPasswordDTO, resetPasswordDTO);
    return await this.authService.resetUserPassword(resetPasswordDTO);
  }
}
