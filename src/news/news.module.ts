import { Module, forwardRef } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedItem, News } from 'src/entities';
import { AdminsModule } from 'src/admins/admins.module';
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([News, FeedItem]),
    AdminsModule,
    forwardRef(() => SubscriptionsModule),
  ],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}
