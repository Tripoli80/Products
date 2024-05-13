import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './user.schema';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...userProviders],
  exports: [UsersService, ...userProviders],
})
export class UserModule {}
