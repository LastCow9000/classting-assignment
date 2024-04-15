import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity, FeedItem, School } from './';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class News extends BaseEntity {
  @IsString()
  @IsNotEmpty()
  @Column()
  title: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  content: string;

  @ManyToOne(() => School, (school) => school.news, { onDelete: 'CASCADE' })
  school: School;

  @OneToMany(() => FeedItem, (feedItem) => feedItem.news)
  feedItems: FeedItem[];
}
