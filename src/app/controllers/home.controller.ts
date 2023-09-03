import {Controller, Get} from '@nestjs/common';
import {HomeService} from '../services/home.service';

@Controller()
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  getHello(): string {
    return this.homeService.getHello();
  }
}
