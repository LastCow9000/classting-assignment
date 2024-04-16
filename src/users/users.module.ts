import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Newsfeed, User } from 'src/entities';
import { JwtModule } from '@nestjs/jwt';
import { JwtUserStrategy } from 'src/auth/strategies/jwt-user.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User, Newsfeed]), JwtModule.register({})],
  controllers: [UsersController],
  providers: [UsersService, JwtUserStrategy],
  exports: [UsersService],
})
export class UsersModule {}
