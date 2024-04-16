import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedItem, News } from 'src/entities';
import { QueryRunner, Repository } from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto';
import { AdminsService } from 'src/admins/admins.service';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    @InjectRepository(FeedItem)
    private readonly feedItemRepository: Repository<FeedItem>,
    private readonly adminsService: AdminsService,
    @Inject(forwardRef(() => SubscriptionsService))
    private readonly subscriptionsService: SubscriptionsService,
  ) {}

  async createNews(
    { title, content }: CreateNewsDto,
    adminId: number,
    queryRunner: QueryRunner,
  ) {
    const qrNewsRepository = this.getNewsRepository(queryRunner);
    const qrFeedItemRepository = this.getFeedItemRepository(queryRunner);

    const school = await this.validateManagedSchool(adminId);
    const news = qrNewsRepository.create({ title, content, school });
    const savedNews = await qrNewsRepository.save(news);

    const subscriptions =
      await this.subscriptionsService.findSubscriptionsBySchool(school.id);
    const newsfeeds = subscriptions.map(
      (subscription) => subscription.user.newsfeed,
    );
    await Promise.all(
      newsfeeds.map((newsfeed) =>
        qrFeedItemRepository.save({ news: savedNews, newsfeed }),
      ),
    );

    return savedNews;
  }

  async updateNews({ newsId, updateNewsDto, adminId }) {
    await this.validateAuthorization(newsId, adminId);

    if (updateNewsDto.title || updateNewsDto.content) {
      await this.newsRepository.update(newsId, {
        ...updateNewsDto,
      });

      return newsId;
    }
  }

  async deleteNews(newsId: number, adminId: number) {
    await this.validateAuthorization(newsId, adminId);

    await this.newsRepository.delete(newsId);

    return newsId;
  }

  findNewsBySchool(schoolId: number) {
    return this.newsRepository.find({
      where: { school: { id: schoolId } },
      order: { createdAt: 'desc' },
    });
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

  async validateNews(newsId: number) {
    const existNews = await this.newsRepository.findOne({
      where: { id: newsId },
      relations: ['school'],
    });
    if (!existNews) {
      throw new NotFoundException('해당하는 소식이 존재하지 않습니다.');
    }

    return existNews;
  }

  async validateAuthorization(newsId: number, adminId: number) {
    const school = await this.validateManagedSchool(adminId);
    const existNews = await this.validateNews(newsId);
    if (existNews.school.id !== school.id) {
      throw new ForbiddenException(
        '다른 학교의 소식은 수정, 삭제할 수 없습니다.',
      );
    }
  }

  getNewsRepository(queryRunner?: QueryRunner) {
    return queryRunner
      ? queryRunner.manager.getRepository<News>(News)
      : this.newsRepository;
  }

  getFeedItemRepository(queryRunner?: QueryRunner) {
    return queryRunner
      ? queryRunner.manager.getRepository<FeedItem>(FeedItem)
      : this.feedItemRepository;
  }
}
