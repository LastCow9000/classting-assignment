import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity, FeedItem, User } from './';

@Entity()
export class Newsfeed extends BaseEntity {
  @OneToOne(() => User, (user) => user.newsfeed, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @OneToMany(() => FeedItem, (feedItem) => feedItem.newsfeed)
  feedItems: FeedItem[];
}
