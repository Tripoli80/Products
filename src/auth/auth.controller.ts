import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiModelResponse } from 'src/dto';
import { User } from 'src/user/user.schema';
import { AuthGuard } from 'src/guards/auth-guard';
import { IUser } from 'src/user/user.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'LogIn user. Permissions ["ALL"]\nin exemple record  test  user? you can enter ' })
  @ApiModelResponse(User)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Register new user. Permissions ["ALL"]' })
  @Post('singup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Log out user. Permissions ["Auth User"]' })
  @Get('logout')
  logOut(@Request() req: { user: IUser; token: string }) {
    return this.authService.logout(req.user.id, req.token);
  }
}
