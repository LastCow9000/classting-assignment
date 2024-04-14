import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity, News, Newsfeed } from './';

@Entity()
export class FeedItem extends BaseEntity {
  @ManyToOne(() => Newsfeed, (newsfeed) => newsfeed.feedItems, {
    onDelete: 'CASCADE',
  })
  newsfeed: Newsfeed;

  @ManyToOne(() => News, (news) => news.feedItems, { onDelete: 'CASCADE' })
  news: News;
}
