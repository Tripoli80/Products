import {
  Controller,
  UseGuards,
  Get,
  Request,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { UsersService } from './user.service';
// import { AuthGuard } from 'src/guards/auth-guard';
import { User } from './user.schema';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ApiBaseRestResponse, ApiModelResponse } from '../dto';
import { AuthGuard } from '../guards/auth-guard';
import { IUser } from './user.interface';
import { IResponse, OrderType } from '../base/interfaces';

@ApiTags('User')
@ApiBearerAuth('JWT')
@Controller('user')
export class UsersController {
  constructor(private readonly userServices: UsersService) {}
  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ description: 'Get all users. Permissions ["Own | Admin"]' })
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
  @ApiModelResponse(User)
  @ApiBaseRestResponse()
  async getUsers(
    @Request() req: { user: IUser },
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
    @Query('orderType') orderType: OrderType = OrderType.DESC,
  ): Promise<IResponse<IUser>> {
    if (req.user.role !== 'admin') {
      return {
        success: !!req?.user,
        data: req?.user ? [req.user] : [],
      };
    } else {
      const users = await this.userServices.getUsers({
        limit,
        offset,
        orderType,
      });
      return {
        success: !!users?.length,
        data: users,
      };
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ description: 'Get user by Id. Permissions ["Own | Admin"]' })
  @ApiModelResponse(User)
  @ApiBaseRestResponse()
  async getUserById(
    @Param('id') id: string,
    @Request() req: { user: User },
  ): Promise<IResponse<User>> {
    if (req.user.role !== 'admin' && req.user.id !== id)
      throw new HttpException(
        `You can not see this user ${id}`,
        HttpStatus.BAD_REQUEST,
      );
    const user = await this.userServices.getUserById(id);
    return {
      success: !!user,
      data: user,
    };
  }
}
