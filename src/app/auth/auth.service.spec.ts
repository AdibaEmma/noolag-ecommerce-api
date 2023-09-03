/* eslint-disable @typescript-eslint/no-unused-vars */
import {Test, TestingModule} from '@nestjs/testing';
import {AuthService} from './auth.service';
import {Role, User} from '@app/entities';
import {UsersService, EmailService} from '../services';
import {JwtService} from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;

  const mockUsersRepository = {
    create: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
  };

  const mockRolesRepository = {
    findAll: jest.fn(),
  };

  const mockEmailService = {
    sendSuccessfulRegistration: jest.fn(),
    sendResetPasswordSuccessEmail: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn().mockImplementation(() => 'mockToken'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: User,
          useValue: mockUsersRepository,
        },
        {
          provide: Role,
          useValue: mockRolesRepository,
        },
        {
          provide: EmailService,
          useValue: mockEmailService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
});
