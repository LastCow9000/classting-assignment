import { Body, Controller, Post } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('ADMINS')
@Controller('api/v1/admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @ApiOperation({
    summary: '어드민 회원가입',
    description: '어드민 전용 회원 가입',
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
    description: '중복된 이메일',
    schema: {
      example: {
        message: '이미 존재하는 email 입니다.',
        error: 'Conflict',
        statusCode: 409,
      },
    },
  })
  @Post()
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.createAdmin(createAdminDto);
  }

  @ApiOperation({
    summary: '어드민 로그인',
    description: '어드민 전용 로그인',
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
        message: '존재하지 않는 관리자입니다.',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @Post('/login')
  async login(@Body() loginAdminDto: LoginAdminDto) {
    return await this.adminsService.login(loginAdminDto);
  }
}
