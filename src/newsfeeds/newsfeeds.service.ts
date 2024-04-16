import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Newsfeed } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class NewsfeedsService {
  constructor(
    @InjectRepository(Newsfeed)
    private readonly newsfeedRepository: Repository<Newsfeed>,
  ) {}

  async findNewsFromNewsfeed(userId: number) {
    const newsFeed = await this.newsfeedRepository.findOne({
      where: { user: { id: userId } },
      relations: { feedItems: { news: { school: true } } },
      order: { feedItems: { news: { createdAt: 'DESC' } } },
    });

    return newsFeed.feedItems.map((feedItem) => feedItem.news);
  }
}
