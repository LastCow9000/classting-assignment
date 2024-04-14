import { Entity, ManyToOne } from 'typeorm';
import { School, User, BaseEntity } from './';

@Entity()
export class Subscription extends BaseEntity {
  @ManyToOne(() => User, (user) => user.subscriptions, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => School, (school) => school.subscriptions, {
    onDelete: 'CASCADE',
  })
  school: School;
}
