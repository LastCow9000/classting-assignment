import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from 'src/entities';
import { SchoolsService } from 'src/schools/schools.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    private readonly schoolsService: SchoolsService,
    private readonly usersService: UsersService,
  ) {}

  async subscribeSchool(schoolId: number, userId: number) {
    const existSubscription = await this.subscriptionRepository.findOne({
      where: { schoolId, userId },
    });
    if (existSubscription) {
      throw new ConflictException('이미 구독 되었습니다.');
    }

    const school = await this.schoolsService.findSchoolById(schoolId);
    if (!school) {
      throw new NotFoundException('존재하지 않는 학교 페이지 입니다.');
    }

    const user = await this.usersService.findUserById(userId);
    const subscription = this.subscriptionRepository.create({
      school: school,
      user,
    });

    return await this.subscriptionRepository.save(subscription);
  }

  async findAllSubscriptions(userId: number) {
    return await this.subscriptionRepository.find({
      where: { userId },
      select: ['createdAt'],
      relations: ['school'],
      order: { createdAt: 'desc' },
    });
  }
}
