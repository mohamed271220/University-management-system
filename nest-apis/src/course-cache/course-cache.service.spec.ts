import { Test, TestingModule } from '@nestjs/testing';
import { CourseCacheService } from './course-cache.service';

describe('CourseCacheService', () => {
  let service: CourseCacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseCacheService],
    }).compile();

    service = module.get<CourseCacheService>(CourseCacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
