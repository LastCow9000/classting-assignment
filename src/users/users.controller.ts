import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { TransactionInterceptor } from 'src/common/interceptors/transaction.interceptor';
import { QR } from 'src/common/decorators/query-runner.decorator';
import { QueryRunner } from 'typeorm';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('USERS')
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: '학생 회원가입',
    description: '학생 전용 회원 가입',
  })
  @ApiCreatedResponse({
    description: '액세스 토큰 반환',
    schema: {
      example: {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQHNzLnNzIiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE3MTMyNjM0MDQsImV4cCI6MTcxMzI2NzAwNH0.8CaZHMO5iaCI-Jvl48Gk07a8B1p_aEaChhwpHGKhWeg',
      },
    },
  })
  @ApiConflictResponse({
    description: '중복된 이메일로 충돌 발생',
    schema: {
      example: {
        message: '이미 존재하는 email 입니다.',
        error: 'Conflict',
        statusCode: 409,
      },
    },
  })
  @Post()
  @UseInterceptors(TransactionInterceptor)
  createAdmin(
    @Body() createUserDto: CreateUserDto,
    @QR() queryRunner: QueryRunner,
  ) {
    return this.usersService.createUser(createUserDto, queryRunner);
  }

  @ApiOperation({
    summary: '학생 로그인',
    description: '학생 전용 로그인',
  })
  @ApiCreatedResponse({
    description: '액세스 토큰 반환',
    schema: {
      example: {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQHNzLnNzIiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE3MTMyNjM0MDQsImV4cCI6MTcxMzI2NzAwNH0.8CaZHMO5iaCI-Jvl48Gk07a8B1p_aEaChhwpHGKhWeg',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: '잘못된 이메일 혹은 비밀번호 입력',
    schema: {
      example: {
        message: '잘못된 비밀번호 입니다.',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.usersService.login(loginUserDto);
  }
}
