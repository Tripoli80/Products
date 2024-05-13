import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './auth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signIn', () => {
    it('should return a user with HTTP status 200', async () => {
      const signInDto: SignInDto = {
        email: 'test@example.com',
        password: 'password',
      };
      const mockUser = {
        id: 'user_id',
        email: 'test@example.com',
        password: 'XXXXXXXX',
        token: 'token',
        name: 'name',
        createdAt: new Date(),
        updatedAt: new Date(),
        /* моковий об'єкт користувача для тестування */
      };

      jest.spyOn(authService, 'signIn').mockResolvedValueOnce(mockUser);

      const result = await controller.signIn(signInDto);
      console.log("🚀 ~ result:", result)

      expect(result).toEqual(mockUser);
    });
  });

  describe('signUp', () => {
    it('should return a user with HTTP status 200', async () => {
      const signUpDto: SignUpDto = {
        email: 'test@example.com',
        password: 'XXXXXXXX',
      };
      const mockUser = {
        id: 'user_id',
        email: 'test@example.com',
        password: 'XXXXXXXX',
        token: 'token',
        name: 'name',
        createdAt: new Date(),
        updatedAt: new Date(),
        /* моковий об'єкт користувача для тестування */
      };

      jest.spyOn(authService, 'signUp').mockResolvedValueOnce(mockUser);

      const result = await controller.signUp(signUpDto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('logOut', () => {
    it('should return a user with HTTP status 200', async () => {
      const mockUser = {
        id: 'user_id',
        email: 'test@example.com',
        password: 'XXXXXXXX',
        token: 'token',
        name: 'name',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockToken = 'token';

      jest.spyOn(authService, 'logout').mockResolvedValueOnce(mockUser);

      const result = await controller.logOut({
        user: mockUser,
        token: mockToken,
      });

      expect(result).toEqual({
        user: mockUser,
        token: mockToken,
      });
    });
  });
});
