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

@Index(['name', 'region'])
@Entity()
export class School extends BaseEntity {
  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

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
