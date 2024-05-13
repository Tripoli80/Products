import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  ValidateIf,
} from 'class-validator';
import { IUser } from 'src/user/user.interface';

export class SignInDto implements IUser {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @ApiProperty({ example: 'e33@ex.ua' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Asjdkkl!!22kld' })
  password: string;
}

export class SignUpDto extends SignInDto {
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @ApiProperty({ example: 'Some778898PassW0rd!!' })
  password: string;

  @ApiProperty({ example: 'SomeGoodName' })
  @IsOptional()
  @ValidateIf(e => e.name)
  @IsString()
  name?: string;
}
