import { Injectable, Logger } from '@nestjs/common';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from 'src/course/course.entity';
import { Department } from '../department/department.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { User } from 'src/user/user.entity';
import { v4 as uuid } from 'uuid';
import { Lecture } from 'src/lecture/lecture.entity';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Op } from 'sequelize';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course)
    private courseModel: typeof Course,
    @InjectModel(Department)
    private departmentModel: typeof Department,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Lecture)
    private lectureModel: typeof Lecture,
  ) {}

  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    const { departmentId, professorId, ...courseData } = createCourseDto;

    const existingCourse = await this.courseModel.findOne({
      where: { code: courseData.code },
    });
    if (existingCourse) {
      throw new BadRequestException('Course already exists.');
    }

    const department = await this.departmentModel.findByPk(departmentId);
    if (!department) {
      throw new NotFoundException('Department not found');
    }

    const professor = await this.userModel.findByPk(professorId);
    if (!professor || professor.role !== 'Professor') {
      throw new NotFoundException('Professor not found');
    }

    return this.courseModel.create({
      id: uuid(),
      ...courseData,
      departmentId,
      professorId,
    });
  }

  async getAllCourses(
    search: string = '',
    limit: number = 10,
    offset: number = 0,
  ): Promise<Course[]> {
    try {
      const courses = await this.courseModel.findAll({
        raw: true,
        nest: true,
        where: search
          ? {
              name: {
                [Op.like]: `%${search}%`,
              },
            }
          : undefined,
        limit,
        offset,
        include: [
          {
            model: Department,
            as: 'department',
          },
          {
            model: User,
            as: 'professor',
            attributes: ['id', 'username', 'email'],
          },
        ],
      });
      return courses;
    } catch (error) {
      Logger.error(error);
      throw new BadRequestException('Failed to get courses');
    }
  }

  async getCourseById(id: string): Promise<Course> {
    return this.courseModel.findByPk(id, {});
  }

  async getCourseLectures(courseId: string) {
    const course = await this.courseModel.findByPk(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return this.lectureModel.findAll({
      where: { courseId },
    });
  }

  async updateCourse(courseId: string, updateCourseDto: UpdateCourseDto) {
    const course = await this.courseModel.findByPk(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const { departmentId, professorId, ...courseData } = updateCourseDto;

    if (departmentId) {
      const department = await this.departmentModel.findByPk(departmentId);
      if (!department) {
        throw new NotFoundException('Department not found');
      }
    }

    if (professorId) {
      const professor = await this.userModel.findByPk(professorId);
      if (!professor || professor.role !== 'Professor') {
        throw new NotFoundException('Professor not found');
      }
    }

    return course.update({
      ...courseData,
      departmentId,
      professorId,
    });
  }

  async deleteCourse(courseId: string) {
    const course = await this.courseModel.findByPk(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    await course.destroy();
  }
}
