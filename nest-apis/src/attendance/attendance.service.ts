import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Attendance } from './attendance.entity';
import { Lecture } from 'src/lecture/lecture.entity';
import { User } from 'src/user/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

import { v4 as uuid } from 'uuid';
import { StudentCourse } from 'src/student-course/student-course.entity';
import { Hall } from 'src/hall/hall.entity';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance)
    private attendanceModel: typeof Attendance,
    @InjectModel(Lecture)
    private lectureModel: typeof Lecture,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(StudentCourse)
    private studentCourseModel: typeof StudentCourse,
    @InjectModel(Hall)
    private hallModel: typeof Hall,
  ) {}

  async createAttendance(createAttendanceDto: CreateAttendanceDto, user: User) {
    const { studentId, lectureId } = createAttendanceDto;
    const [student, lecture] = await Promise.all([
      this.userModel.findByPk(studentId),
      this.lectureModel.findByPk(lectureId),
    ]);

    if (!student || student.role !== 'Student') {
      throw new NotFoundException('Invalid student ID');
    }

    if (!lecture) {
      throw new NotFoundException('Invalid lecture ID');
    }

    if (user.role === 'Professor' && user.id !== lecture?.professorId) {
      throw new BadRequestException(
        'You are not authorized to sign students for this lecture',
      );
    }

    const isStudentSignedForCourse = await this.studentCourseModel.findOne({
      where: { studentId, courseId: lecture?.courseId },
    });

    if (!isStudentSignedForCourse) {
      throw new NotFoundException('Student is not signed for this course');
    }

    try {
      const attendance = await this.attendanceModel.create({
        id: uuid(),
        ...createAttendanceDto,
      });

      return attendance;
    } catch (error) {
      Logger.error(error);
    }
  }
  async getAllAttendance(limit: number, offset: number) {
    const { count, rows: attendance } =
      await this.attendanceModel.findAndCountAll({
        raw: true,
        nest: true,
        limit,
        offset,
      });

    const totalPages = Math.ceil(count / limit);
    const currentPage = Math.ceil(offset / limit) + 1;
    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;

    const pagination = {
      totalItems: count,
      itemsPerPage: limit,
      currentPage: currentPage,
      totalPages: totalPages,
      hasNextPage: hasNextPage,
      hasPreviousPage: hasPreviousPage,
      nextPage: hasNextPage ? currentPage + 1 : null,
      previousPage: hasPreviousPage ? currentPage - 1 : null,
    };

    return { pagination, attendance };
  }

  async getAttendance(attendanceId: string) {
    const attendance = await this.attendanceModel.findByPk(attendanceId, {
      raw: true,
      nest: true,
    });

    if (!attendance) {
      throw new NotFoundException('Attendance not found');
    }

    return attendance;
  }

  async getStudentAttendance(studentId: string, user: User) {
    const student = await this.userModel.findByPk(studentId);

    if (!student || student.role !== 'Student') {
      throw new NotFoundException('Invalid student ID');
    }

    if (user.role === 'Student' && user.id !== studentId) {
      throw new BadRequestException('You are not authorized to view this data');
    }

    const attendance = await this.attendanceModel.findAll({
      where: { studentId },
      raw: true,
      nest: true,
      include: [
        {
          model: this.lectureModel,
          include: [
            {
              model: this.hallModel,
            },
          ],
        },
      ],
    });

    return attendance;
  }

  async getLectureAttendance(lectureId: string) {
    const lecture = await this.lectureModel.findByPk(lectureId);

    if (!lecture) {
      throw new NotFoundException('Lecture not found');
    }

    const attendance = await this.attendanceModel.findAll({
      where: { lectureId },
      raw: true,
      nest: true,
      include: [
        {
          model: this.userModel,
          as: 'student',
        },
        {
          model: this.lectureModel,
          include: [{ model: this.hallModel }],
        },
      ],
    });

    return attendance;
  }

  async getLectureStudentAttendance(lectureId: string, studentId: string) {
    const [student, lecture] = await Promise.all([
      this.userModel.findByPk(studentId),
      this.lectureModel.findByPk(lectureId),
    ]);

    if (!student || student.role !== 'Student') {
      throw new NotFoundException('Invalid student ID');
    }

    if (!lecture) {
      throw new NotFoundException('Invalid lecture ID');
    }

    const attendance = await this.attendanceModel.findAll({
      where: { studentId, lectureId },
      raw: true,
      nest: true,
      include: [
        {
          model: this.lectureModel,
          include: [{ model: this.hallModel }],
        },
      ],
    });

    return attendance;
  }

  async updateAttendanceStatus(
    attendanceId: string,
    updateAttendanceDto: UpdateAttendanceDto,
  ) {
    const attendance = await this.attendanceModel.findByPk(attendanceId);

    if (!attendance) {
      throw new NotFoundException('Attendance not found');
    }

    const { status } = updateAttendanceDto;

    attendance.status = status;
    await attendance.save();

    return attendance;
  }
  async deleteAttendance(attendanceId: string) {
    const attendance = await this.attendanceModel.findByPk(attendanceId);

    if (!attendance) {
      throw new NotFoundException('Attendance not found');
    }

    await attendance.destroy();

    return { message: 'Attendance deleted successfully' };
  }
}
