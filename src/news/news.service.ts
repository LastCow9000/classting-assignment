import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto';
import { AdminsService } from 'src/admins/admins.service';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    private readonly adminsService: AdminsService,
  ) {}

  async createNews({ title, content }: CreateNewsDto, adminId: number) {
    const admin = await this.adminsService.findAdminById(adminId);
    if (!admin.managedSchool) {
      throw new ForbiddenException(
        '관리 중인 학교 페이지가 존재하지 않습니다.',
      );
    }
    const school = admin.managedSchool;

    const news = this.newsRepository.create({ title, content, school });
    return await this.newsRepository.save(news);
  }
}
