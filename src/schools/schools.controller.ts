import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { JwtAdminGuard } from 'src/auth/guards/jwt-admin.guard';
import { User } from 'src/common/decorators/user.decorator';

@Controller('api/v1/schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Post()
  @UseGuards(JwtAdminGuard)
  createSchool(@Body() createSchoolDto: CreateSchoolDto, @User() user) {
    return this.schoolsService.createSchool(createSchoolDto, user.id);
  }
}
