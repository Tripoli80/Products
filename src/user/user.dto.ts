import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { IUser } from './user.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements IUser {
  @ApiProperty({ example: 'ex@ex.ua' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: 'SomeGoodName' })
  @IsOptional()
  @ValidateIf(e => e.name)
  @IsString()
  name?: string;
}

export class UpdateUserDto implements Partial<IUser> {
  name?: string;
  email?: string;
  password?: string;
  token?: string;
}
