import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
// import { User } from 'src/user/user.schema';

@Module({
//   imports: [User],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
