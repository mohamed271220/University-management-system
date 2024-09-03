import { Test, TestingModule } from '@nestjs/testing';
import { CourseCacheController } from './course-cache.controller';

describe('CourseCacheController', () => {
  let controller: CourseCacheController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseCacheController],
    }).compile();

    controller = module.get<CourseCacheController>(CourseCacheController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
