import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from 'src/entities';
import { AdminsModule } from 'src/admins/admins.module';

@Module({
  imports: [TypeOrmModule.forFeature([News]), AdminsModule],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}
