import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Admin,
  FeedItem,
  News,
  Newsfeed,
  School,
  Subscription,
  User,
} from './entities';
import { AdminsModule } from './admins/admins.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Admin, FeedItem, News, Newsfeed, School, Subscription, User],
      synchronize: true,
      logging: process.env.NODE_ENV !== 'production',
      keepConnectionAlive: true,
      charset: 'utf8mb4',
    }),
    AdminsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
