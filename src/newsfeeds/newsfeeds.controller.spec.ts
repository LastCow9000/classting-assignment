import { Test, TestingModule } from '@nestjs/testing';
import { NewsfeedsController } from './newsfeeds.controller';
import { NewsfeedsService } from './newsfeeds.service';

describe('NewsfeedsController', () => {
  let controller: NewsfeedsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsfeedsController],
      providers: [NewsfeedsService],
    }).compile();

    controller = module.get<NewsfeedsController>(NewsfeedsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
