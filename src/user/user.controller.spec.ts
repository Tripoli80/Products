import { OrderType } from '../base/interfaces';
import { userAdminStub, userStub, usersStub } from './stubs/user.stub';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { JwtService } from '@nestjs/jwt';

// jest.mock('./user.service');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let jwtService: JwtService;
  let userModel: any;
  beforeEach(() => {
    usersService = new UsersService(jwtService, userModel);
    usersController = new UsersController(usersService);
    jest.clearAllMocks();
  });
  describe('getUserById', () => {
    it('should return an user', async () => {
      const mockUser = {
        success: true,
        data: userAdminStub(),
      };

      jest
        .spyOn(usersService, 'getUserById')
        .mockResolvedValueOnce(userAdminStub());
      const user = await usersController.getUserById(userAdminStub().id, {
        user: userAdminStub(),
      });
      expect(user).toEqual(mockUser);
    });
  });

  describe('getUsers', () => {
    it('should return users (admin)', async () => {
      const mockUsers = {
        success: true,
        data: usersStub(),
      };

      jest.spyOn(usersService, 'getUsers').mockResolvedValueOnce(usersStub());
      const users = await usersController.getUsers(
        {
          user: userAdminStub(),
        },
        10,
        0,
        OrderType.ASC,
      );

      expect(users).toEqual(mockUsers);
    });
  });
  describe('getUsers', () => {
    it('should return users (user)', async () => {
      const mockUsers = {
        success: true,
        data: [userStub()],
      };

      jest.spyOn(usersService, 'getUsers').mockResolvedValueOnce(usersStub());
      const users = await usersController.getUsers(
        {
          user: userStub(),
        },
        10,
        0,
        OrderType.ASC,
      );
      expect(users).toEqual(mockUsers);
    });
  });
});
