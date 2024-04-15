import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { Subscription } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolsModule } from 'src/schools/schools.module';
import { UsersModule } from 'src/users/users.module';
import { NewsModule } from 'src/news/news.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription]),
    SchoolsModule,
    UsersModule,
    NewsModule,
  ],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
})
export class SubscriptionsModule {}
