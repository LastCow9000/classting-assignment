import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { JwtAdminGuard } from 'src/auth/guards/jwt-admin.guard';
import { User } from 'src/common/decorators/user.decorator';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { TransactionInterceptor } from 'src/common/interceptors/transaction.interceptor';
import { QR } from 'src/common/decorators/query-runner.decorator';
import { QueryRunner } from 'typeorm';

@Controller('api/v1/schools/news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @UseGuards(JwtAdminGuard)
  @UseInterceptors(TransactionInterceptor)
  createNews(
    @Body() createNewsDto: CreateNewsDto,
    @User() user,
    @QR() queryRunner: QueryRunner,
  ) {
    return this.newsService.createNews(createNewsDto, user.id, queryRunner);
  }

  @Patch('/:news_id')
  @UseGuards(JwtAdminGuard)
  updateNews(
    @Param('news_id', ParseIntPipe) newsId: number,
    @Body() updateNewsDto: UpdateNewsDto,
    @User() user,
  ) {
    return this.newsService.updateNews({
      newsId,
      updateNewsDto,
      adminId: user.id,
    });
  }

  @Delete('/:news_id')
  @UseGuards(JwtAdminGuard)
  deleteNews(@Param('news_id', ParseIntPipe) newsId: number, @User() user) {
    return this.newsService.deleteNews(newsId, user.id);
  }
}
