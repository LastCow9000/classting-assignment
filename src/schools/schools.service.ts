import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { School } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateSchoolDto } from './dto/create-school.dto';
import { AdminsService } from 'src/admins/admins.service';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
    private readonly adminsService: AdminsService,
  ) {}

  async createSchool({ name, region }: CreateSchoolDto, adminId: number) {
    const existSchool = await this.schoolRepository.findOne({
      where: {
        name,
        region,
      },
    });
    if (existSchool) {
      throw new ConflictException('이미 학교 페이지가 존재합니다.');
    }

    const admin = await this.adminsService.findAdminById(adminId);
    if (admin.managedSchool) {
      throw new ConflictException('이미 관리하는 학교 페이지가 존재합니다.');
    }

    const school = this.schoolRepository.create({
      name,
      region,
      admin,
    });

    return await this.schoolRepository.save(school);
  }
}
