import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {AppController} from './app.controller';
import {AppService} from './app.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres', // Change this to match your database
      host: 'localhost',
      port: 5432,
      username: 'your_username',
      password: 'your_password',
      database: 'ecommerce_db',
      models: [],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
