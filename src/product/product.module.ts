import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { productProviders } from './product.schema';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [ProductController],
  providers: [ProductService, ...productProviders],
  exports: [ProductService, ...productProviders],
})
export class ProductModule {}
