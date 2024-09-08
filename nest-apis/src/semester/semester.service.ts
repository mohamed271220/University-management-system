import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Course } from 'src/course/course.entity';
import { Grade } from 'src/grade/grade.entity';
import { User } from 'src/user/user.entity';
import { Semester } from './semester.entity';
import { InjectModel } from '@nestjs/sequelize';
import { StudentCourse } from 'src/student-course/student-course.entity';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { v4 as uuid } from 'uuid';
import { UpdateSemesterDto } from './dto/update-semester.dto';

@Injectable()
export class SemesterService {
  constructor(
    @InjectModel(Semester)
    private semesterModel: typeof Semester,
    @InjectModel(Course)
    private courseModel: typeof Course,
    @InjectModel(Grade)
    private gradeModel: typeof Grade,
    @InjectModel(User)
    private userUserModel: typeof User,
    @InjectModel(StudentCourse)
    private studentCourseModel: typeof StudentCourse,
  ) {}

  async createSemester(
    createSemesterDto: CreateSemesterDto,
  ): Promise<Semester> {
    const { name } = createSemesterDto;
    const existingSemester = await this.semesterModel.findOne({
      where: { name },
    });

    if (existingSemester) {
      throw new BadRequestException('Semester already exists.');
    }

    const semester = await this.semesterModel.create({
      id: uuid(),
      ...createSemesterDto,
    });

    return semester;
  }

  async getAllSemesters() {
    const semesters = await this.semesterModel.findAll({
      raw: true,
      nest: true,
    });
    return semesters;
  }

  async getSemester(semesterId: string): Promise<Semester> {
    const semester = await this.semesterModel.findByPk(semesterId, {
      raw: true,
    });
    if (!semester) {
      throw new NotFoundException('Semester not found.');
    }
    return semester;
  }

  async getSemesterGrades(semesterId: string): Promise<Grade[]> {
    const semester = await this.semesterModel.findByPk(semesterId);
    if (!semester) {
      throw new NotFoundException('Semester not found.');
    }
    const grades = await this.gradeModel.findAll({
      where: { semesterId },
      include: [this.semesterModel],
      raw: true,
      nest: true,
    });
    return grades;
  }

  async getStudentEnrolledCourses(
    semesterId: string,
  ): Promise<StudentCourse[]> {
    const studentCourses = await this.studentCourseModel.findAll({
      where: { semesterId },
      include: [this.semesterModel, this.courseModel, this.userUserModel],
      raw: true,
      nest: true,
    });
    return studentCourses;
  }

  async updateSemester(
    semesterId: string,
    updateSemesterDto: UpdateSemesterDto,
  ): Promise<Semester> {
    const semester = await this.semesterModel.findByPk(semesterId);

    if (!semester) {
      throw new BadRequestException('Semester not found.');
    }

    await semester.update(updateSemesterDto);

    return semester;
  }

  async deleteSemester(semesterId: string) {
    const semester = await this.semesterModel.findByPk(semesterId);

    if (!semester) {
      throw new BadRequestException('Semester not found.');
    }

    await semester.destroy();

    return { message: 'Semester deleted successfully.' };
  }
}
