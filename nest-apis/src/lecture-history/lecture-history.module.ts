import { Module } from '@nestjs/common';
import { LectureHistoryService } from './lecture-history.service';
import { LectureHistoryController } from './lecture-history.controller';

@Module({
  providers: [LectureHistoryService],
  controllers: [LectureHistoryController]
})
export class LectureHistoryModule {}
