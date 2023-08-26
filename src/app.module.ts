import {Module, OnApplicationBootstrap} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {HomeController} from './app/controllers/home.controller';
import {HomeService} from './app/services/home.service';
import {ProductsModule} from './app/modules/products.module';
import {CategoriesModule} from './app/modules/categories.module';
import {RoutingModule} from '@app/modules/routing.module';
import {DatabaseModule} from '@app/modules/database.module';
import {AuthModule} from '@app/auth/auth.module';
import configuration from '@app/config/configuration';
import {AuthGuard, RolesGuard} from '@app/guards';
import {RolesService} from '@app/services/roles.service';
import {RolesModule} from '@app/modules/roles.module';
import {JwtService} from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
    ProductsModule,
    CategoriesModule,
    RoutingModule,
    AuthModule,
    RolesModule,
  ],
  controllers: [HomeController],
  providers: [HomeService, JwtService, RolesGuard, AuthGuard],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private roleService: RolesService) {}

  async onApplicationBootstrap() {
    await this.roleService.seedRoles();
  }
}
