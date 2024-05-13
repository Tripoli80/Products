import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { PRODUCT_PROVIDE_NAME } from 'src/base/constants';
import { Product } from './product.schema';
import { IProduct, IProductServiceInterface } from './product.interface';
import { IFindListOrder } from 'src/base/interfaces';
import { IUser } from 'src/user/user.interface';

@Injectable()
export class ProductService implements IProductServiceInterface {
  constructor(
    @Inject(PRODUCT_PROVIDE_NAME)
    private readonly productModel: Model<Product>,
  ) {}
  async isExist(id: string): Promise<IProduct> {
    const product = await this.productModel.findById(id);
    if (!product)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    return product;
  }

  async create(createProductDto: CreateProductDto) {
    const product = await this.productModel.create(createProductDto);
    return {
      success: !!product,
      data: product,
    };
  }

  async findAll(option: IFindListOrder) {
    const { limit, offset, orderType } = option;
    const products = await this.productModel
      .find()
      .sort({ _id: orderType })
      .skip(offset)
      .limit(limit);

    return {
      success: !!products,
      data: products,
      total: products.length,
    };
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id);
    return {
      success: !!product,
      data: product,
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto, user: IUser) {
    await this.isExist(id);
    if (user.role !== 'admin') {
      const product = await this.productModel.findOneAndUpdate(
        { _id: id, owner: user.id },
        updateProductDto,
      );
      return {
        success: !!product,
        data: !!product ? { ...product.toObject(), ...updateProductDto } : null,
      };
    } else {
      const product = await this.productModel.findByIdAndUpdate(
        id,
        updateProductDto,
      );
      return {
        success: !!product,
        data: !!product ? { ...product.toObject(), ...updateProductDto } : null,
      };
    }
  }
  async remove(id: string, user: IUser) {
    let product = await this.isExist(id);
    if (user.role !== 'admin') {
      product = await this.productModel.findOneAndDelete({
        _id: id,
        owner: user.id,
      });
    } else {
      product = await this.productModel.findByIdAndDelete(id);
    }

    return {
      success: !!product,
      data: product,
    };
  }
}
