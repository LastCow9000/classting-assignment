import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/entities';
import { JwtModule } from '@nestjs/jwt';
import { JwtAdminStrategy } from 'src/auth/strategies/jwt-admin.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), JwtModule.register({})],
  controllers: [AdminsController],
  providers: [AdminsService, JwtAdminStrategy],
})
export class AdminsModule {}
