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
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('NEWS')
@Controller('api/v1/schools/news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @ApiOperation({
    summary: '소식 작성',
    description: '학교 관리자는 학교 페이지 내에 소식을 작성할 수 있다.',
  })
  @ApiCreatedResponse({
    description: '만들어진 소식 정보 반환',
    schema: {
      example: {
        title: '제목33',
        content: '내용입니다33',
        school: {
          id: 18,
          createdAt: '2024-04-16T12:10:37.496Z',
          updatedAt: '2024-04-16T12:10:37.496Z',
          name: '수성고5',
          region: '수원',
        },
        id: 52,
        createdAt: '2024-04-16T12:15:57.110Z',
        updatedAt: '2024-04-16T12:15:57.110Z',
      },
    },
  })
  @ApiForbiddenResponse({
    description: '어드민이 학교 페이지를 생성하지 않고 뉴스를 발행함',
    schema: {
      example: {
        message: '관리 중인 학교 페이지가 존재하지 않습니다.',
        error: 'Forbidden',
        statusCode: 403,
      },
    },
  })
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

  @ApiOperation({
    summary: '소식 수정',
    description: '학교 관리자는 작성된 소식을 수정할 수 있다.',
  })
  @ApiOkResponse({
    description: '수정된 PK 반환 ',
    schema: {
      example: 33,
    },
  })
  @ApiForbiddenResponse({
    description:
      '다른 학교의 소식을 수정 시도하거나 관리 중인 학교 페이지가 존재하지 않음',
    schema: {
      example: {
        message: '다른 학교의 소식은 수정, 삭제할 수 없습니다.',
        error: 'Forbidden',
        statusCode: 403,
      },
    },
  })
  @ApiNotFoundResponse({
    description: '해당하는 소식이 존재하지 않음',
    schema: {
      example: {
        message: '해당하는 소식이 존재하지 않습니다.',
        error: 'NotFound',
        statusCode: 404,
      },
    },
  })
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

  @ApiOperation({
    summary: '소식 삭제',
    description: '학교 관리자는 작성된 소식을 삭제할 수 있다.',
  })
  @ApiOkResponse({
    description: '삭제된 PK 반환',
    schema: {
      example: {
        title: '제목33',
        content: '내용입니다33',
        school: {
          id: 18,
          createdAt: '2024-04-16T12:10:37.496Z',
          updatedAt: '2024-04-16T12:10:37.496Z',
          name: '수성고5',
          region: '수원',
        },
        id: 52,
        createdAt: '2024-04-16T12:15:57.110Z',
        updatedAt: '2024-04-16T12:15:57.110Z',
      },
    },
  })
  @ApiForbiddenResponse({
    description:
      '다른 학교의 소식을 삭제 시도하거나 관리 중인 학교 페이지가 존재하지 않음',
    schema: {
      example: {
        message: '다른 학교의 소식은 수정, 삭제할 수 없습니다.',
        error: 'Forbidden',
        statusCode: 403,
      },
    },
  })
  @ApiNotFoundResponse({
    description: '해당하는 소식이 존재하지 않음',
    schema: {
      example: {
        message: '해당하는 소식이 존재하지 않습니다.',
        error: 'NotFound',
        statusCode: 404,
      },
    },
  })
  @Delete('/:news_id')
  @UseGuards(JwtAdminGuard)
  deleteNews(@Param('news_id', ParseIntPipe) newsId: number, @User() user) {
    return this.newsService.deleteNews(newsId, user.id);
  }
}
