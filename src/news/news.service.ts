import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const school = await this.validateManagedSchool(adminId);
    const news = this.newsRepository.create({ title, content, school });

    return await this.newsRepository.save(news);
  }

  async deleteNews(newsId: number, adminId: number) {
    const school = await this.validateManagedSchool(adminId);
    const existNews = await this.newsRepository.findOne({
      where: { id: newsId },
      relations: ['school'],
    });
    if (!existNews) {
      throw new NotFoundException('해당하는 소식이 존재하지 않습니다.');
    }
    if (existNews.school.id !== school.id) {
      throw new ForbiddenException('다른 학교의 소식은 삭제할 수 없습니다.');
    }

    await this.newsRepository.delete(newsId);

    return newsId;
  }

  async validateManagedSchool(adminId: number) {
    const admin = await this.adminsService.findAdminById(adminId);
    if (!admin.managedSchool) {
      throw new ForbiddenException(
        '관리 중인 학교 페이지가 존재하지 않습니다.',
      );
    }

    return admin.managedSchool;
  }
}