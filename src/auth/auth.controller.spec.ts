import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    login: jest.fn().mockResolvedValue({ access_token: 'token' }),
    register: jest.fn().mockResolvedValue({ id: '1', email: 'test@example.com' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const result = await controller.login({ email: 'test@example.com', password: '123456' });
      expect(result).toEqual({ access_token: 'token' });
      expect(authService.login).toHaveBeenCalled();
    });
  });

  describe('register', () => {
    it('should return a user object', async () => {
      const dto = { email: 'test@example.com', password: '123456', name: 'Test User' };
      const result = await controller.register(dto);
      expect(result).toEqual({ id: '1', email: 'test@example.com' });
      expect(authService.register).toHaveBeenCalled();
    });
  });
});
