import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

jest.mock('bcrypt', () => ({
  compare: jest.fn().mockResolvedValue(true), // sempre retorna true
  hash: jest.fn().mockResolvedValue('hashed'),
}));


describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUsersService = {
    create: jest.fn(),
    findByEmail: jest.fn(),
    updateLastLogin: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should call usersService.create with register dto', async () => {
      const dto: RegisterDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashed',
      };

      const createdUser = {
        id: '1',
        ...dto,
        password: 'hashed',
        createdAt: new Date(),
        updatedAt: new Date(),
        role: 'user',
      };

      mockUsersService.create.mockResolvedValue(createdUser);

      const result = await service.register(dto);
      expect(result).toEqual({
        message: 'User registered successfully',
        user: createdUser,
      });      
      expect(usersService.create).toHaveBeenCalledWith({
        ...dto,
        password: 'hashed',
        role: 'user',
      });
      
    });
  });

  describe('login', () => {
    it('should return access token for valid credentials', async () => {
      const dto: LoginDto = {
        email: 'test@example.com',
        password: 'hashed',
      };

      const user = {
        id: '1',
        email: dto.email,
        password: 'hashed',
        name: 'User',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUsersService.findByEmail.mockResolvedValue(user);
      mockJwtService.sign.mockReturnValue('mocked.jwt.token');

      const result = await service.login(dto);
      expect(result).toEqual({ access_token: 'mocked.jwt.token' });
      expect(usersService.findByEmail).toHaveBeenCalledWith(dto.email);
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: user.id,        
        role: user.role,
      });
    });
  });
});
