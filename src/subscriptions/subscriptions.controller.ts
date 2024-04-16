import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { JwtUserGuard } from 'src/auth/guards/jwt-user.guard';
import { User } from 'src/common/decorators/user.decorator';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('SUBSCRIPTIONS')
@Controller('/api/v1/subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @ApiOperation({
    summary: '학교 페이지 구독',
    description: '학생은 학교 페이지를 구독할 수 있다.',
  })
  @ApiCreatedResponse({
    description: '유저와 학교 정보가 포함된 구독 정보 반환',
    schema: {
      example: {
        userId: 1,
        schoolId: 15,
        user: {
          id: 1,
          createdAt: '2024-04-15T00:57:28.527Z',
          updatedAt: '2024-04-15T00:57:28.527Z',
          email: 'user@ss.ss',
          name: 'u1',
          newsfeed: {
            id: 7,
            createdAt: '2024-04-16T08:15:54.306Z',
            updatedAt: '2024-04-16T08:15:54.306Z',
          },
        },
        school: {
          id: 15,
          createdAt: '2024-04-16T12:05:28.193Z',
          updatedAt: '2024-04-16T12:05:28.193Z',
          name: '수성고2',
          region: '수원',
        },
        createdAt: '2024-04-16T12:53:39.849Z',
      },
    },
  })
  @ApiNotFoundResponse({
    description: '존재하지 않는 학교 페이지를 구독하려 함',
    schema: {
      example: {
        message: '존재하지 않는 학교 페이지 입니다.',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @ApiConflictResponse({
    description: '이미 구독된 학교 페이지를 또 구독하려 함',
    schema: {
      example: {
        message: '이미 구독 되었습니다.',
        error: 'Conflict',
        statusCode: 409,
      },
    },
  })
  @Post()
  @UseGuards(JwtUserGuard)
  subscribeSchool(
    @Body('school_id', ParseIntPipe) schoolId: number,
    @User() user,
  ) {
    return this.subscriptionsService.subscribeSchool(schoolId, user.id);
  }

  @ApiOperation({
    summary: '구독 중인 학교 페이지 목록 확인',
    description: '학생은 구독 중인 학교 페이지 목록을 확인할 수 있다.',
  })
  @ApiOkResponse({
    description: '구독 중인 학교 정보 배열 반환',
    schema: {
      example: [
        {
          createdAt: '2024-04-16T12:53:39.849Z',
          school: {
            id: 15,
            createdAt: '2024-04-16T12:05:28.193Z',
            updatedAt: '2024-04-16T12:05:28.193Z',
            name: '수성고2',
            region: '수원',
          },
        },
        {
          createdAt: '2024-04-15T19:20:45.241Z',
          school: {
            id: 1,
            createdAt: '2024-04-15T07:46:41.272Z',
            updatedAt: '2024-04-15T07:46:41.272Z',
            name: '수일고',
            region: '수원',
          },
        },
      ],
    },
  })
  @Get()
  @UseGuards(JwtUserGuard)
  getSubscriptions(@User() user) {
    return this.subscriptionsService.findAllSubscriptions(user.id);
  }

  @ApiOperation({
    summary: '학교 페이지 구독 취소',
    description: '학생은 구독 중인 학교 페이지를 구독 취소할 수 있다.',
  })
  @ApiOkResponse({
    description: '구독 취소된 학교의 PK 반환',
    schema: { example: 22 },
  })
  @ApiNotFoundResponse({
    description: '존재하지 않는 학교 페이지를 구독 취소하려 함',
    schema: {
      example: {
        message: '존재하지 않는 학교 페이지 입니다.',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @ApiBadRequestResponse({
    description: '미구독 학교 페이지를 구독 취소하려 함',
    schema: {
      example: {
        message: '현재 해당 학교 페이지를 구독하고 있지 않습니다.',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @Delete('/:school_id')
  @UseGuards(JwtUserGuard)
  unsubscribeSchool(
    @Param('school_id', ParseIntPipe) schoolId: number,
    @User() user,
  ) {
    return this.subscriptionsService.unsubscribeSchool(schoolId, user.id);
  }

  @ApiOperation({
    summary: '학교 페이지별 소식 확인',
    description: '학생은 구독 중인 학교 페이지별 소식을 볼 수 있다.',
  })
  @ApiOkResponse({
    description: '해당 학교 페이지의 소식 리스트 반환',
    schema: {
      example: [
        {
          id: 2,
          createdAt: '2024-04-15T10:23:24.688Z',
          updatedAt: '2024-04-15T10:23:24.688Z',
          title: '테스트 공지2',
          content: '내용2',
        },
        {
          id: 1,
          createdAt: '2024-04-15T10:20:15.058Z',
          updatedAt: '2024-04-15T10:20:15.058Z',
          title: '테스트 공지1',
          content: '내용1',
        },
      ],
    },
  })
  @ApiNotFoundResponse({
    description: '존재하지 않는 학교 페이지의 소식을 요청함',
    schema: {
      example: {
        message: '존재하지 않는 학교 페이지 입니다.',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @ApiBadRequestResponse({
    description: '미구독 학교 페이지의 소식을 요청함',
    schema: {
      example: {
        message: '현재 해당 학교 페이지를 구독하고 있지 않습니다.',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @Get('/:school_id/news')
  @UseGuards(JwtUserGuard)
  getSubscribedSchoolNews(
    @Param('school_id', ParseIntPipe) schoolId: number,
    @User() user,
  ) {
    return this.subscriptionsService.findNewsBySubscribedSchool(
      schoolId,
      user.id,
    );
  }
}
