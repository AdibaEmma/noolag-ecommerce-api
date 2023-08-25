import {Category, Product} from '@app/entities';
import { User } from '@app/entities/users.entity';
import {Sequelize} from 'sequelize-typescript';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: process.env.PG_USERNAME,
        password: process.env.PG_PASSWORD,
        database: 'ecommerce_db',
      });
      sequelize.addModels([Product, Category, User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
