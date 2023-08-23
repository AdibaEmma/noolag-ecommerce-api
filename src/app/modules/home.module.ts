import {Module} from '@nestjs/common';
import {HomeController} from '@app/controllers/home.controller';
import {HomeService} from '@app/services';

@Module({
  providers: [HomeService],
  controllers: [HomeController],
  exports: [HomeService],
})
export class HomeModule {}
