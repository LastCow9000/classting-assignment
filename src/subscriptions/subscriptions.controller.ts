import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { JwtUserGuard } from 'src/auth/guards/jwt-user.guard';
import { User } from 'src/common/decorators/user.decorator';

@Controller('/api/v1/subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  @UseGuards(JwtUserGuard)
  subscribeSchool(
    @Body('school_id', ParseIntPipe) schoolId: number,
    @User() user,
  ) {
    return this.subscriptionsService.subscribeSchool(schoolId, user.id);
  }

  @Get()
  @UseGuards(JwtUserGuard)
  getSubscriptions(@User() user) {
    return this.subscriptionsService.findAllSubscriptions(user.id);
  }

  @Delete('/:school_id')
  @UseGuards(JwtUserGuard)
  unsubscribeSchool(
    @Param('school_id', ParseIntPipe) schoolId: number,
    @User() user,
  ) {
    return this.subscriptionsService.unsubscribeSchool(schoolId, user.id);
  }
}
