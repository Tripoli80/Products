import {
  IsString,
  IsNumber,
  IsOptional,
  ValidateIf,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Category, IProduct } from './product.interface';

export class CreateProductDto implements IProduct {
  @ApiProperty({ example: 'Pizza' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Pizza description' })
  @IsString()
  description: string;

  @ApiProperty({ example: 10 })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: Category.PRODUCT,
    enum: Category,
    default: Category.OTHER,
    description: `Product category can by only [${Object.values(Category).join(' | ')}]`,
  })
  @IsEnum(Category)
  @IsString()
  category: Category;

  @IsString()
  @IsOptional()
  @ValidateIf(el => el.owner)
  owner: string;
}

export class UpdateProductDto implements Partial<IProduct> {
  @ApiProperty({ example: 'Pizza' })
  @IsOptional()
  @ValidateIf(el => el.name)
  @IsString()
  name: string;

  @ApiProperty({ example: 'Pizza description' })
  @IsOptional()
  @ValidateIf(el => el.description)
  @IsString()
  description: string;

  @ApiProperty({ example: 10 })
  @IsOptional()
  @ValidateIf(el => el.price)
  @IsNumber()
  price: number;

  @ApiProperty({
    example: Category.PRODUCT,
    enum: Category,
    default: Category.OTHER,
  })
  @IsOptional()
  @ValidateIf(el => el.category)
  @IsString()
  category: Category;

  @IsString()
  @IsOptional()
  @ValidateIf(el => el.owner)
  owner: string;
}
