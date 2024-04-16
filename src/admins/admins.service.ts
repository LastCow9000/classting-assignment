import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../entities';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { ROLE } from '../common/constant/role';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async createAdmin({ email, name, password }: CreateAdminDto) {
    const isExistEmail = await this.adminRepository.exists({
      where: { email },
    });
    if (isExistEmail) {
      throw new ConflictException('이미 존재하는 email 입니다.');
    }

    const hash = await bcrypt.hash(password, 10);
    const newAdmin = this.adminRepository.create({
      email,
      name,
      password: hash,
    });
    const savedAdmin = await this.adminRepository.save(newAdmin);

    return this.getAccessToken(savedAdmin.id, savedAdmin.email);
  }

  async login({ email, password }: LoginAdminDto) {
    const existingAdmin = await this.findAdminByEmail(email);
    if (!existingAdmin) {
      throw new UnauthorizedException('존재하지 않는 관리자입니다.');
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      existingAdmin.password,
    );
    if (!isCorrectPassword) {
      throw new UnauthorizedException('잘못된 비밀번호 입니다.');
    }

    return this.getAccessToken(existingAdmin.id, existingAdmin.email);
  }

  findAdminByEmail(email: string) {
    return this.adminRepository.findOne({ where: { email } });
  }

  findAdminById(id: number) {
    return this.adminRepository.findOne({ where: { id } });
  }

  getAccessToken(id: number, email: string) {
    const payload = {
      id,
      email,
      role: ROLE.ADMIN,
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: 3600,
      }),
    };
  }
}
