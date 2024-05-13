export type TUserRole = 'admin' | 'user';

export interface IUser {
  id?: string;
  name?: string;
  email: string;
  token?: string;
  password: string;
  role?: TUserRole;
  createdAt?: Date;
  updatedAt?: Date;
}
