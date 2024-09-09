import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { StudentCourse } from './student-course.entity';
import { User } from 'src/user/user.entity';
import { Course } from 'src/course/course.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Semester } from 'src/semester/semester.entity';
import {
  CreateStudentCourseDto,
  UpdateStudentCourseDto,
} from './dto/index.dto';

@Injectable()
export class StudentCourseService {
  constructor(
    @InjectModel(StudentCourse)
    private studentCourseModel: typeof StudentCourse,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Course)
    private courseModel: typeof Course,
    @InjectModel(Semester)
    private semesterModel: typeof Semester,
  ) {}

  async enrollStudentInCourse(
    studentId: string,
    createStudentCourseDto: CreateStudentCourseDto,
    user: User,
  ) {
    if (
      studentId !== user?.id &&
      user?.role !== 'Student' &&
      user?.role !== 'Admin'
    ) {
      throw new UnauthorizedException('Unauthorized');
    }

    const { courses, semesterId } = createStudentCourseDto;

    const [student, semester] = await Promise.all([
      this.userModel.findByPk(studentId),
      this.semesterModel.findByPk(semesterId),
    ]);

    if (!student || student.role !== 'Student') {
      throw new NotFoundException('Student not found');
    }
    if (!semester) {
      throw new NotFoundException('Semester not found');
    }

    // Check if the student is already enrolled in any of the courses for the same semester
    const existingEnrollments = await this.studentCourseModel.findAll({
      where: {
        studentId,
        semesterId,
        courseId: courses,
      },
    });

    if (existingEnrollments.length > 0) {
      throw new BadRequestException(
        'Student already enrolled in one or more of these courses for this semester. Please update your courses or delete existing enrollments.',
      );
    }

    const studentCourses = await Promise.all(
      courses.map(async (courseId) => {
        const course = await this.courseModel.findByPk(courseId);
        if (!course) {
          throw new NotFoundException(`Course with ID ${courseId} not found`);
        }
        return this.studentCourseModel.create({
          courseId,
          studentId,
          semesterId,
        });
      }),
    );

    return studentCourses;
  }

  async getStudentCoursesByStudentId(studentId: string, user: User) {
    if (studentId !== user?.id && user?.role !== 'Admin') {
      throw new UnauthorizedException('Unauthorized');
    }

    const student = await this.userModel.findByPk(studentId);

    if (!student || student.role !== 'Student') {
      throw new NotFoundException('Student not found');
    }

    const studentCourses = await this.studentCourseModel.findAll({
      raw: true,
      nest: true,
      where: { studentId },
      include: [
        {
          model: this.courseModel,
          as: 'course',
        },
        {
          model: this.semesterModel,
          as: 'semester',
        },
      ],
    });

    return studentCourses;
  }

  async getStudentsByCourseId(courseId: string, user: User) {
    if (
      user?.role !== 'Admin' &&
      user?.role !== 'Staff' &&
      user?.role !== 'Professor'
    ) {
      throw new UnauthorizedException('Unauthorized');
    }

    const course = await this.courseModel.findByPk(courseId);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (user?.role === 'Professor' && user?.id !== course.professorId) {
      throw new UnauthorizedException('Unauthorized');
    }

    const courseStudents = await this.studentCourseModel.findAll({
      raw: true,
      nest: true,
      where: { courseId },
      include: [
        {
          model: this.userModel,
          as: 'student',
        },
        {
          model: this.semesterModel,
          as: 'semester',
        },
      ],
    });

    return courseStudents;
  }

  async getStudentCourseById(studentId: string, courseId: string, user: User) {
    if (
      studentId !== user?.id &&
      user?.role !== 'Admin' &&
      user?.role !== 'Staff' &&
      user?.role !== 'Professor'
    ) {
      throw new UnauthorizedException('Unauthorized');
    }

    const studentCourse = await this.studentCourseModel.findOne({
      raw: true,
      nest: true,
      where: { studentId, courseId },
      include: [
        {
          model: this.userModel,
          as: 'student',
        },
        {
          model: this.courseModel,
          as: 'course',
        },
        {
          model: this.semesterModel,
          as: 'semester',
        },
      ],
    });

    if (!studentCourse) {
      throw new NotFoundException('Student course not found');
    }

    return studentCourse;
  }

  async updateStudentCourse(
    studentId: string,
    courseId: string,
    updateStudentCourseDto: UpdateStudentCourseDto,
    user: User,
  ) {
    if (studentId !== user?.id && user?.role !== 'Admin') {
      throw new UnauthorizedException('Unauthorized');
    }

    const studentCourse = await this.studentCourseModel.findOne({
      where: { studentId, courseId },
    });

    if (!studentCourse) {
      throw new NotFoundException('Student course not found');
    }

    await studentCourse.update(updateStudentCourseDto);

    return studentCourse;
  }

  async removeStudentFromCourse(
    studentId: string,
    courseId: string,
    user: User,
  ) {
    if (studentId !== user?.id && user?.role !== 'Admin') {
      throw new UnauthorizedException('Unauthorized');
    }

    const studentCourse = await this.studentCourseModel.findOne({
      where: { studentId, courseId },
    });

    if (!studentCourse) {
      throw new NotFoundException('Student course not found');
    }

    await studentCourse.destroy();

    return { message: 'Student removed from course' };
  }
}
