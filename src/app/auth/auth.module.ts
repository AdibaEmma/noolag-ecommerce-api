import {Logger, Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {DatabaseModule} from '@app/modules/database.module';
import {ValidationService} from '@app/services';
import {usersProviders} from '@app/providers/users.providers';
import {UsersService} from '@app/services/users.service';
import {jwtConstants} from '@app/constants/constants';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, ValidationService, ...usersProviders, Logger],
})
export class AuthModule {}
