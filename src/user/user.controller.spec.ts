import { userStub} from './stubs/user.stub';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { Test } from '@nestjs/testing';


jest.mock('./user.service');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    usersController = moduleRef.get<UsersController>(UsersController);
    jest.clearAllMocks();
  });

  describe('getUserById', () => {
    it('should return an user', async () => {
      const mockUser = userStub();

      jest.spyOn(usersService, 'getUserById').mockResolvedValueOnce(mockUser);

      const user = await usersController.getUserById(mockUser.id, {
        user: mockUser,
      });

      expect(user).toEqual(mockUser);
    });
  });
});
