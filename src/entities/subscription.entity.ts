import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { School, User } from './';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Subscription {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  schoolId: number;

  @ApiProperty({
    example: '2024-04-16 04:20:45.241551',
    description: '구독 날짜',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.subscriptions)
  @JoinColumn()
  user: User;

  @ManyToOne(() => School, (school) => school.subscriptions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  school: School;
}
