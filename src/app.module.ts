import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {HomeController} from './app/controllers/home.controller';
import {HomeService} from './app/services/home.service';
import {ProductsModule} from './app/modules/products.module';
import {CategoriesModule} from './app/modules/categories.module';
import {RoutingModule} from '@app/modules/routing.module';
import {DatabaseModule} from '@app/modules/database.module';
import {AuthModule} from '@app/auth/auth.module';
import configuration from '@app/config/configuration';
import {RolesGuard} from '@app/guards';

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
  ],
  controllers: [HomeController],
  providers: [
    HomeService,
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
