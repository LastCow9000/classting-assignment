import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity, FeedItem, School } from './';

@Entity()
export class News extends BaseEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => School, (school) => school.news, { onDelete: 'CASCADE' })
  school: School;

  @OneToMany(() => FeedItem, (feedItem) => feedItem.news)
  feedItems: FeedItem[];
}
