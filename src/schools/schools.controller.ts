import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { JwtAdminGuard } from 'src/auth/guards/jwt-admin.guard';
import { User } from 'src/common/decorators/user.decorator';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('SCHOOLS')
@Controller('api/v1/schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @ApiOperation({
    summary: '학교 페이지 생성',
    description: '학교 관리자는 지역, 학교명으로 학교 페이지를 생성할 수 있다.',
  })
  @ApiCreatedResponse({
    description: '만들어진 학교 페이지 정보 반환',
    schema: {
      example: {
        name: '수성고5',
        region: '수원',
        admin: {
          id: 16,
          createdAt: '2024-04-16T12:10:22.042Z',
          updatedAt: '2024-04-16T12:10:22.042Z',
          email: 'sss13@ss.ss',
          name: 'sys',
          managedSchool: null,
        },
        id: 18,
        createdAt: '2024-04-16T12:10:37.496Z',
        updatedAt: '2024-04-16T12:10:37.496Z',
      },
    },
  })
  @ApiConflictResponse({
    description:
      '이미 만들어진 학교 페이지가 존재하거나 로그인한 관리자가 관리하는 학교가 존재함',
    schema: {
      example: {
        message: '이미 학교 페이지가 존재합니다.',
        error: 'Conflict',
        statusCode: 409,
      },
    },
  })
  @Post()
  @UseGuards(JwtAdminGuard)
  createSchool(@Body() createSchoolDto: CreateSchoolDto, @User() user) {
    return this.schoolsService.createSchool(createSchoolDto, user.id);
  }
}
