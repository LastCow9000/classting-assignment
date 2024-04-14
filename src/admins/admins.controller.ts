import { Body, Controller, Post } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { createAdminDto } from './dto/create-admin.dto';

@Controller('api/v1/admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  createAdmin(@Body() { email, name }: createAdminDto) {
    return this.adminsService.createAdmin(email, name);
  }
}
