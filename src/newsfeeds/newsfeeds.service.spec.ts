import { Test, TestingModule } from '@nestjs/testing';
import { NewsfeedsService } from './newsfeeds.service';

describe('NewsfeedsService', () => {
  let service: NewsfeedsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsfeedsService],
    }).compile();

    service = module.get<NewsfeedsService>(NewsfeedsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
