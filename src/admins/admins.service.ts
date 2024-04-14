import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async createAdmin(email: string, name: string) {
    const admin = await this.findAdminByEmail(email);
    if (admin) {
      throw new ConflictException('이미 존재하는 email 입니다.');
    }

    const newAdmin = this.adminRepository.create({ email, name });
    const savedAdmin = await this.adminRepository.save(newAdmin);

    return savedAdmin;
  }

  findAdminByEmail(email: string) {
    return this.adminRepository.findOne({ where: { email } });
  }
}
