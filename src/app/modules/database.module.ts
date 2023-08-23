import { Module } from '@nestjs/common';
import { databaseProviders } from '@app/providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
