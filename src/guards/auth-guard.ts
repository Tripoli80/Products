import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IUserToken } from './auth.interfaces'  ;
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/user.schema';
import { USER_PROVIDE_NAME } from '../base/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(USER_PROVIDE_NAME)
    private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();
    try {
      this.jwtService.verify(token);
      const payload: IUserToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.userModel.findOne({ email: payload.email });
      if (!user) throw new UnauthorizedException();
      request['user'] = user;
      request['token'] = token;
    } catch (e) {
      console.log('🚀 ~ e:', e);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

@Injectable()
export class AuthGuardAdmin implements CanActivate {
  constructor(private jwtService: JwtService) {}
  @InjectModel(User.name) private userModel: Model<User>;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: IUserToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const admin = await this.userModel.findOne({ mail: payload.email });
      payload['token'] = token;
      request['user'] = payload;
      console.log('🚀 ~ admin:', admin);

      throw new UnauthorizedException();
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
