import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';
import { LectureService } from './lecture.service';
import { Roles } from 'src/auth/roles.decorator';
import { CreateLectureDTO } from './dto/create-lecture.dto';
import { UpdateLectureDTO } from './dto/update-lecture.dto';

@Controller('api/v1/lectures')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Post('/')
  @Roles('Professor', 'Admin', 'Staff')
  createLecture(@Body() createLectureDto: CreateLectureDTO) {
    return this.lectureService.createLecture(createLectureDto);
  }

  @Get('/')
  getAllLectures(
    @Query('search') search: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.lectureService.getAllLectures();
  }

  @Get(':lectureId')
  getLecture(@Param('lectureId') lectureId: string) {
    return this.lectureService.getLectureById(lectureId);
  }

  @Get(':lectureId/attendance')
  getLectureAttendance(@Param('lectureId') lectureId: string) {
    return this.lectureService.getLectureAttendance(lectureId);
  }

  @Get(':lectureId/archived')
  getLectureArchived(@Param('lectureId') lectureId: string) {
    return this.lectureService.getLectureArchived(lectureId);
  }

  @Put(':lectureId')
  @Roles('Professor', 'Admin', 'Staff')
  updateLecture(
    @Param('lectureId') lectureId: string,
    @Body() updateLectureDto: UpdateLectureDTO,
  ) {
    return this.lectureService.updateLecture(lectureId, updateLectureDto);
  }

  //   @Put(':lectureId/archive')
  //   @Roles('Professor', 'Admin', 'Staff')
  //   archiveLecture(@Param('lectureId') lectureId: string) {
  //     return this.lectureService.archiveLecture(lectureId);
  //   }

  @Delete(':lectureId')
  @Roles('Admin', 'Staff')
  deleteLecture(@Param('lectureId') lectureId: string) {
    return this.lectureService.deleteLecture(lectureId);
  }
}
