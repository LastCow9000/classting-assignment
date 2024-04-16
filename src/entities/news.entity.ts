import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity, FeedItem, School } from './';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class News extends BaseEntity {
  @ApiProperty({
    required: true,
    example: '공지사항을 전달합니다.',
    description: '소식 제목',
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  title: string;

  @ApiProperty({
    required: true,
    example: '안녕하세요. 이번달 공지사항을 전달드립니다.',
    description: '소식 내용',
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  content: string;

  @ManyToOne(() => School, (school) => school.news, { onDelete: 'CASCADE' })
  school: School;

  @OneToMany(() => FeedItem, (feedItem) => feedItem.news)
  feedItems: FeedItem[];
}
