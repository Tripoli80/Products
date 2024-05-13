import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Connection, HydratedDocument } from 'mongoose';
import { IUser, TUserRole } from './user.interface';
import {
  DB_CONECTION,
  USER_DB_NAME,
  USER_PROVIDE_NAME,
} from '../base/constants';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser {
  @ApiProperty()
  @Prop({ required: true, type: String, default: '' })
  email: string;
  @ApiProperty()
  @Prop({ required: true, type: String })
  password: string;
  @ApiProperty()
  @Prop({ type: String, default: '' })
  @ApiProperty()
  name: string;
  @Prop({ type: String, default: '' })
  @ApiProperty()
  token: string;
  @Prop({ type: String, default: 'user' })
  @ApiProperty()
  role: TUserRole;
  @Prop()
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  @Prop()
  updatedAt: Date;
  @ApiProperty()
  id?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
// autofill createdat
UserSchema.pre('save', function (next) {
  console.log('object');
  this.createdAt = new Date();
  this.updatedAt = new Date();
  next();
});

export const userProviders = [
  {
    provide: USER_PROVIDE_NAME,
    useFactory: (connection: Connection) =>
      connection.model(USER_DB_NAME, UserSchema),
    inject: [DB_CONECTION],
  },
];
