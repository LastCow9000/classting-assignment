import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Admin, BaseEntity, News, Subscription } from './';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Index(['name', 'region'])
@Entity()
export class School extends BaseEntity {
  @ApiProperty({ required: true, example: '경기고', description: '학교명' })
  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  @ApiProperty({
    required: true,
    example: '서울',
    description: '학교 지역',
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  region: string;

  @OneToOne(() => Admin, (admin) => admin.managedSchool, {
    cascade: ['insert'],
  })
  @JoinColumn()
  admin: Admin;

  @OneToMany(() => News, (news) => news.school)
  news: News[];

  @OneToMany(() => Subscription, (subscription) => subscription.school)
  subscriptions: Subscription[];
}
