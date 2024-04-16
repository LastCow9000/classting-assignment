import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { TransactionInterceptor } from 'src/common/interceptors/transaction.interceptor';
import { QR } from 'src/common/decorators/query-runner.decorator';
import { QueryRunner } from 'typeorm';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(TransactionInterceptor)
  createAdmin(
    @Body() createUserDto: CreateUserDto,
    @QR() queryRunner: QueryRunner,
  ) {
    return this.usersService.createUser(createUserDto, queryRunner);
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.usersService.login(loginUserDto);
  }
}
