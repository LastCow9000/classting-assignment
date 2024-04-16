import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Newsfeed, User } from 'src/entities';
import { QueryRunner, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ROLE } from 'src/common/constant/role';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Newsfeed)
    private readonly newsfeedRepository: Repository<Newsfeed>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async createUser(
    { email, name, password }: CreateUserDto,
    queryRunner: QueryRunner,
  ) {
    const qrUserRepository = this.getUserRepository(queryRunner);
    const qrNewsRepository = this.getNewsfeedRepository(queryRunner);

    const isExistEmail = await qrUserRepository.exists({
      where: { email },
    });
    if (isExistEmail) {
      throw new ConflictException('이미 존재하는 email 입니다.');
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = qrUserRepository.create({
      email,
      name,
      password: hash,
    });
    const savedUser = await qrUserRepository.save(newUser);

    const newsfeed = qrNewsRepository.create({ user: newUser });
    await qrNewsRepository.save(newsfeed);

    return this.getAccessToken(savedUser.id, savedUser.email);
  }

  async login({ email, password }: LoginUserDto) {
    const existingUser = await this.findUserByEmail(email);
    if (!existingUser) {
      throw new UnauthorizedException('존재하지 않는 학생입니다.');
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isCorrectPassword) {
      throw new UnauthorizedException('잘못된 비밀번호 입니다.');
    }

    return this.getAccessToken(existingUser.id, existingUser.email);
  }

  findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  findUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  getAccessToken(id: number, email: string) {
    const payload = {
      id,
      email,
      role: ROLE.STUDENT,
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: 3600,
    });
  }

  getUserRepository(queryRunner?: QueryRunner) {
    return queryRunner
      ? queryRunner.manager.getRepository<User>(User)
      : this.userRepository;
  }

  getNewsfeedRepository(queryRunner?: QueryRunner) {
    return queryRunner
      ? queryRunner.manager.getRepository<Newsfeed>(Newsfeed)
      : this.newsfeedRepository;
  }
}
