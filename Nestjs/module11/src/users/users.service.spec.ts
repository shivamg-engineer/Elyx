import { Test, TestingModule } from '@nestjs/testing';
import { User, UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockUsersRepository = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'UsersRepository',
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should return all users', async () => {
    const mockUsers: User[] = [{ id: 1, name: 'Mock User' }];
    mockUsersRepository.findAll.mockResolvedValue(mockUsers);

    const result = await service.getUsers();

    expect(result).toEqual(mockUsers);
    expect(mockUsersRepository.findAll).toHaveBeenCalled();
  });

  it('should return user by id', async () => {
    const mockUser: User = { id: 1, name: 'Mock User' };
    mockUsersRepository.findOne.mockResolvedValue(mockUser);

    const result = await service.getUserById(1);

    expect(result).toEqual(mockUser);
    expect(mockUsersRepository.findOne).toHaveBeenCalledWith(1);
  });

  it('should throw an error when repository throws', async () => {
    const error = new Error('User not found');

    // simulate repository failure
    mockUsersRepository.findOne.mockRejectedValue(error);

    // assertion for async error
    await expect(service.getUserById(1)).rejects.toThrow('User not found');

    // verify interaction
    expect(mockUsersRepository.findOne).toHaveBeenCalledWith(1);
  });
});
