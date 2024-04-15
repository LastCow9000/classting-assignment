import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { School, User } from './';

@Entity()
export class Subscription {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  schoolId: number;

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
