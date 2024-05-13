import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Connection, HydratedDocument } from 'mongoose';
import { Category, IProduct } from './product.interface';
import { IUser } from 'src/user/user.interface';
import {
  DB_CONECTION,
  PRODUCT_DB_NAME,
  PRODUCT_PROVIDE_NAME,
} from 'src/base/constants';
import { ApiProperty } from '@nestjs/swagger';

export type ProductDocument = HydratedDocument<Product>;

// Створити RESTful API для управління продуктами із моделлю з такими полями: назва, опис, ціна, категорія
@Schema()
export class Product implements IProduct {
  @ApiProperty()
  @Prop({ required: true })
  name: string;
  @ApiProperty()
  @Prop({ default: '' })
  description: string;
  @ApiProperty()
  @Prop({ default: 0 })
  price: number;
  @ApiProperty()
  @Prop({ type: String, enum: Category, default: Category.OTHER })
  category: Category;
  @ApiProperty()
  @Prop({ type: String, ref: 'User', required: true })
  owner: IUser;
  @ApiProperty()
  id?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
export const productProviders = [
  {
    provide: PRODUCT_PROVIDE_NAME,
    useFactory: (connection: Connection) =>
      connection.model(PRODUCT_DB_NAME, ProductSchema),
    inject: [DB_CONECTION],
  },
];
