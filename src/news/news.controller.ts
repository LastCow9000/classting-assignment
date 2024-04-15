import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { JwtAdminGuard } from 'src/auth/guards/jwt-admin.guard';
import { User } from 'src/common/decorators/user.decorator';
import { CreateNewsDto } from './dto/create-news.dto';

@Controller('api/v1/schools/news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @UseGuards(JwtAdminGuard)
  createNews(@Body() createNewsDto: CreateNewsDto, @User() user) {
    return this.newsService.createNews(createNewsDto, user.id);
  }

  @Delete('/:news_id')
  @UseGuards(JwtAdminGuard)
  deleteNews(@Param('news_id', ParseIntPipe) newsId: number, @User() user) {
    return this.newsService.deleteNews(newsId, user.id);
  }
}
