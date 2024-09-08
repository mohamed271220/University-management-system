import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProfessorCourse } from './professor-course.entity';
import { User } from 'src/user/user.entity';
import { Course } from 'src/course/course.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProfessorCourseDto } from './dto/create-professor-course.dto';

@Injectable()
export class ProfessorCourseService {
  constructor(
    @InjectModel(ProfessorCourse)
    private professorCourseModel: typeof ProfessorCourse,
    @InjectModel(User)
    private professorModel: typeof User,
    @InjectModel(Course)
    private courseModel: typeof Course,
  ) {}

  async createProfessorCourse(
    createProfessorCourseDto: CreateProfessorCourseDto,
  ): Promise<ProfessorCourse> {
    const { professorId, courseId } = createProfessorCourseDto;
    const [professor, course] = await Promise.all([
      this.professorModel.findByPk(professorId),
      this.courseModel.findByPk(courseId),
    ]);

    if (!professor) {
      throw new NotFoundException('Professor not found.');
    }

    if (!course) {
      throw new NotFoundException('Course not found.');
    }
    const existingProfessorCourse = await this.professorCourseModel.findOne({
      where: { professorId, courseId },
    });

    if (existingProfessorCourse) {
      throw new BadRequestException('Professor course already exists.');
    }

    try {
      const professorCourse = await this.professorCourseModel.create({
        professorId,
        courseId,
      });

      return professorCourse;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException('Professor course already exists.');
      }
      throw new BadRequestException('Error creating professor course.');
    }
  }

  async getAllProfessorCourses(): Promise<ProfessorCourse[]> {
    return this.professorCourseModel.findAll({
      raw: true,
      nest: true,
      include: [
        {
          model: this.professorModel,
          as: 'professor',
          attributes: ['id', 'username', 'email'],
        },
        {
          model: this.courseModel,
          as: 'course',
          attributes: ['id', 'name', 'code'],
        },
      ],
    });
  }

  async getProfessorCourse(
    professorId: string,
    courseId: string,
  ): Promise<ProfessorCourse> {
    const professorCourse = await this.professorCourseModel.findOne({
      where: { professorId, courseId },
      raw: true,
      nest: true,
      include: [
        {
          model: this.professorModel,
          as: 'professor',
          attributes: ['id', 'username', 'email'],
        },
        {
          model: this.courseModel,
          as: 'course',
          attributes: ['id', 'name', 'code'],
        },
      ],
    });

    if (!professorCourse) {
      throw new NotFoundException('Professor course not found.');
    }

    return professorCourse;
  }

  async getProfessorCourses(professorId: string): Promise<ProfessorCourse[]> {
    const professor = await this.professorModel.findByPk(professorId);

    if (!professor) {
      throw new NotFoundException('Professor not found.');
    }

    const professorCourses = await this.professorCourseModel.findAll({
      where: { professorId },
      raw: true,
      nest: true,
      include: [
        {
          model: this.professorModel,
          as: 'professor',
          attributes: ['id', 'username', 'email'],
        },
        {
          model: this.courseModel,
          as: 'course',
          attributes: ['id', 'name', 'code'],
        },
      ],
    });

    if (!professorCourses) {
      throw new NotFoundException('Professor courses not found.');
    }

    return professorCourses;
  }

  async getCourseProfessors(courseId: string): Promise<ProfessorCourse[]> {
    const course = await this.courseModel.findByPk(courseId);

    if (!course) {
      throw new NotFoundException('Course not found.');
    }

    const courseProfessors = await this.professorCourseModel.findAll({
      where: { courseId },
      raw: true,
      nest: true,
      include: [
        {
          model: this.professorModel,
          attributes: ['id', 'username', 'email'],
        },
        {
          model: this.courseModel,
          as: 'course',
          attributes: ['id', 'name', 'code'],
        },
      ],
    });

    if (!courseProfessors) {
      throw new NotFoundException('Course professors not found.');
    }

    return courseProfessors;
  }

  async deleteProfessorCourse(professorId: string, courseId: string) {
    const professorCourse = await this.professorCourseModel.findOne({
      where: { professorId, courseId },
    });

    if (!professorCourse) {
      throw new NotFoundException('Professor course not found.');
    }

    await professorCourse.destroy();

    return { message: 'Professor course deleted successfully.' };
  }
}
