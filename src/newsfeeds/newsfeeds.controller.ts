import { Controller, Get, UseGuards } from '@nestjs/common';
import { NewsfeedsService } from './newsfeeds.service';
import { JwtUserGuard } from 'src/auth/guards/jwt-user.guard';
import { User } from 'src/common/decorators/user.decorator';

@Controller('/api/v1/newsfeed')
export class NewsfeedsController {
  constructor(private readonly newsfeedsService: NewsfeedsService) {}

  @Get()
  @UseGuards(JwtUserGuard)
  getNewsfeed(@User() user) {
    return this.newsfeedsService.findNewsFromNewsfeed(user.id);
  }
}
