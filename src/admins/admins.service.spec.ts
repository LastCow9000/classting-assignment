import { Test, TestingModule } from '@nestjs/testing';
import { AdminsService } from './admins.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Admin } from '../entities/';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Repository } from 'typeorm';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockAdminRepositoy = () => {
  return {
    findOne: jest.fn(),
    exist: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };
};

describe('AdminsService', () => {
  let service: AdminsService;
  let repository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule, ConfigModule],
      providers: [
        AdminsService,
        {
          provide: getRepositoryToken(Admin),
          useValue: mockAdminRepositoy(),
        },
      ],
    }).compile();

    service = module.get<AdminsService>(AdminsService);
    repository = module.get(getRepositoryToken(Admin));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('id로 해당되는 admin을 찾아와야 한다', async () => {
    //given
    const user = { id: 1, email: 'test@google.com' };
    repository.findOne.mockResolvedValue(user);

    //when
    const result = await service.findAdminById(user.id);

    //then
    expect(result).toStrictEqual({ id: user.id, email: user.email });
  });

  it('email로 해당되는 admin을 찾아와야 한다', async () => {
    //given
    const user = { id: 1, email: 'test@google.com' };
    repository.findOne.mockResolvedValue(user);

    //when
    const result = await service.findAdminByEmail(user.email);

    //then
    expect(result).toStrictEqual({ id: user.id, email: user.email });
  });
});
