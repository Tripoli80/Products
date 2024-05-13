import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/user.service';
import { IUser } from 'src/user/user.interface';
import { IErrorMessege } from 'src/base/interfaces';
import { SignUpDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signIn(email: string, password: string): Promise<IUser | any> {
    const user = await this.usersService.getUserByMail(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException();
    user.token = await this.usersService.GenerateToken(email);
    return this.usersService.updateUser(user.id, { token: user.token });
  }

  async signUp(data: SignUpDto): Promise<IUser | any> {
    return this.usersService.createUser(data);
  }

  async logout(id: string, token): Promise<IUser | IErrorMessege> {
    const user = await this.usersService.getUserById(id);
    if (!user || user.token !== token) throw new UnauthorizedException();
    if (user.token !== token)
      return { message: 'Token is not correct', code: 400 };
    return this.usersService.updateUser(user.id, { token: '' });
  }
}
