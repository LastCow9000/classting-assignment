import { Controller, Get, UseGuards } from '@nestjs/common';
import { NewsfeedsService } from './newsfeeds.service';
import { JwtUserGuard } from 'src/auth/guards/jwt-user.guard';
import { User } from 'src/common/decorators/user.decorator';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('NEWSFEEDS')
@Controller('/api/v1/newsfeed')
export class NewsfeedsController {
  constructor(private readonly newsfeedsService: NewsfeedsService) {}

  @ApiOperation({
    summary: '학교 소식 뉴스피드에서 모아 보기',
    description:
      '학생은 구독 중인 학교 소식을 자신의 뉴스피드에서 모아볼 수 있다.',
  })
  @ApiOkResponse({
    description: '학교 정보가 포함된 뉴스 정보 배열 반환',
    schema: {
      example: [
        {
          id: 44,
          createdAt: '2024-04-16T10:15:40.846Z',
          updatedAt: '2024-04-16T10:15:40.846Z',
          title: '제목7',
          content: '내용7',
          school: {
            id: 12,
            createdAt: '2024-04-15T08:56:02.258Z',
            updatedAt: '2024-04-15T08:56:02.258Z',
            name: '수일고8',
            region: '수원',
          },
        },
        {
          id: 36,
          createdAt: '2024-04-16T09:04:32.649Z',
          updatedAt: '2024-04-16T09:04:32.649Z',
          title: '제목',
          content: '내용',
          school: {
            id: 4,
            createdAt: '2024-04-15T07:54:15.273Z',
            updatedAt: '2024-04-15T07:54:15.273Z',
            name: '수일고3',
            region: '수원',
          },
        },
      ],
    },
  })
  @Get()
  @UseGuards(JwtUserGuard)
  getNewsfeed(@User() user) {
    return this.newsfeedsService.findNewsFromNewsfeed(user.id);
  }
}
