import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth-guard';
import { ApiBaseRestResponse, ApiModelResponse } from 'src/dto';
import { Product } from './product.schema';
import { OrderType } from 'src/base/interfaces';
import { IUser } from 'src/user/user.interface';
import { Category } from './product.interface';
// import { AuthGuard } from 'src/guards/auth-guard';

@ApiTags('Product')
@Controller('product')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({
    description: `Create  Product. Permissions ["User | Admin"]\n
    Product category can by only [${Object.values(Category).join(' | ')}]`,
  })
  @ApiModelResponse(Product)
  @ApiBaseRestResponse()
  create(
    @Body() createProductDto: CreateProductDto,
    @Request() req: { user: IUser },
  ) {
    createProductDto.owner = req.user.id;
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({
    description: 'Find all  Product. Permissions ["User | Admin"]',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'default 10',
  })
  @ApiQuery({
    name: 'offset',
    type: 'number',
    required: false,
    description: 'default 0',
  })
  @ApiQuery({
    name: 'orderType',
    enum: OrderType,
    required: false,
    example: OrderType.DESC,
    description: 'Sort by id, default DESC',
  })
  @ApiModelResponse(Product)
  @ApiBaseRestResponse()
  findAll(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
    @Query('orderType') orderType: OrderType = OrderType.DESC,
  ) {
    return this.productService.findAll({
      limit,
      offset,
      orderType,
    });
  }

  @Get(':id')
  @ApiOperation({
    description: 'Find product by id. Permissions ["User | Admin"]',
  })
  @ApiModelResponse(Product)
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    description:
      'Update product by id. \nPermissions All  ["Admin"]\n Permissions edit anly own ["User"]. ',
  })
  @ApiModelResponse(Product)
  @ApiBaseRestResponse()
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Request() req: { user: IUser },
  ) {
    return this.productService.update(id, updateProductDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: { user: IUser }) {
    return this.productService.remove(id, req.user);
  }
}
