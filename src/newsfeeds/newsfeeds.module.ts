import { Module } from '@nestjs/common';
import { NewsfeedsService } from './newsfeeds.service';
import { NewsfeedsController } from './newsfeeds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Newsfeed } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Newsfeed])],
  controllers: [NewsfeedsController],
  providers: [NewsfeedsService],
})
export class NewsfeedsModule {}
