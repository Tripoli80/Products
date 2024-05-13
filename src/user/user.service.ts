import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './user.schema';
import { IUser } from './user.interface';
import { USER_PROVIDE_NAME } from '../base/constants';
import { IFindListOrder } from '../base/interfaces';

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(() =>USER_PROVIDE_NAME))
    private readonly userModel: Model<User>,
  ) {}
  // @InjectModel(User.name) private userModel: Model<User>;
  async isExist(email: string): Promise<IUser> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async createUser(user: CreateUserDto): Promise<User> {
    if (!user.name || !user.email || !user.password)
      throw new HttpException('User data not defined', HttpStatus.BAD_REQUEST);

    const candidate = await this.isExist(user.email);
    if (candidate) {
      throw new HttpException(
        'User with this mail already exists',
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const token = await this.GenerateToken(user.email);
    const preperedUser: IUser = {
      ...user,
      password: hashedPassword,
      token,
    };
    const newUser = new this.userModel(preperedUser);
    return newUser.save();
  }

  async getUserByMail(email: string): Promise<IUser> {
    const user = await this.isExist(email);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  async getUsers(option: IFindListOrder): Promise<User[]> {
    const { limit, offset, orderType } = option;
    const users: User[] = await this.userModel
      .find()
      .sort({ _id: orderType })
      .skip(offset)
      .limit(limit)
      .select('-password')
      .select('-token')
      .exec();
    return users;
  }

  async getUsersByQuery(query: string, payload?: any): Promise<User[]> {
    const users: User[] = await this.userModel
      .find({
        ...payload,
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } },
        ],
      })
      .sort({ _id: -1 })
      .select('-password')
      .exec();

    return users;
  }
  async getUserById(id: string): Promise<User> {
    const user: User = await this.userModel
      .findById(id)
      .select('-password')
      .exec();
    return user;
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { ...user, updatedAt: new Date() },
      {
        new: true,
      },
    );
    return updatedUser;
  }
  async deleteUser(id: string): Promise<any> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    return deletedUser;
  }

  async GenerateToken(email: string): Promise<string> {
    try {
      const payload = { email };
      const token = await this.jwtService.signAsync(payload);
      return token;
    } catch (error) {
      console.log('error:', error);
      return '';
    }
  }
}
