import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity, Newsfeed, Subscription } from './';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];

  @OneToOne(() => Newsfeed, (newsfeed) => newsfeed.user)
  newsfeed: Newsfeed;
}
