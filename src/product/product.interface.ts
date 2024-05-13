// Створити RESTful API для управління продуктами із моделлю з такими полями: назва, опис, ціна, категорія
import { IUser } from 'src/user/user.interface';
import { CreateProductDto } from './product.dto';
import { IFindListOrder, IResponse } from 'src/base/interfaces';

export enum Category {
  FOOD = 'food',
  CLOTHES = 'clothes',
  ELECTRONICS = 'electronics',
  PRODUCT = 'Product',
  OTHER = 'other',
}

export interface IProduct {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  owner?: IUser | string;
}

export interface IProductServiceInterface {
  create(userDto: CreateProductDto): Promise<IResponse<IProduct>>;
  findAll(option: IFindListOrder): Promise<IResponse<IProduct[]>>;
  findOne(id: string): Promise<IResponse<IProduct>>;
  update(
    id: string,
    productDto: CreateProductDto,
    user: IUser,
  ): Promise<IResponse<IProduct>>;
  remove(id: string, user: IUser): Promise<IResponse<IProduct>>;
}
