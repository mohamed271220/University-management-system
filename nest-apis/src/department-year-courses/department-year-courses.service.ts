import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Course } from 'src/course/course.entity';
import { Department } from 'src/department/department.entity';
import { InjectModel } from '@nestjs/sequelize';
import { DepartmentYearCourses } from './department-year-courses.entity';
import { CreateDepartmentYearCourseDto } from './dto/create-department-year-courses.dto';
import { v4 as uuid } from 'uuid';
import { UpdateDepartmentYearCourseDto } from './dto/update-department-year-courses.dto';

@Injectable()
export class DepartmentYearCoursesService {
  constructor(
    @InjectModel(Department)
    private departmentModel: typeof Department,
    @InjectModel(Course)
    private courseModel: typeof Course,
    @InjectModel(DepartmentYearCourses)
    private departmentYearCoursesModel: typeof DepartmentYearCourses,
  ) {}

  async createDepartmentYearCourses(
    createDepartmentYearCoursesDto: CreateDepartmentYearCourseDto,
  ): Promise<DepartmentYearCourses> {
    const { departmentId, courseId } = createDepartmentYearCoursesDto;

    const [department, course] = await Promise.all([
      this.departmentModel.findByPk(departmentId),
      this.courseModel.findByPk(courseId),
    ]);
    // const department = await this.departmentModel.findByPk(departmentId);
    if (!department) {
      throw new NotFoundException('Department not found');
    }
    // const course = await this.courseModel.findByPk(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    try {
      const departmentYearCourse = await this.departmentYearCoursesModel.create(
        {
          id: uuid(),
          ...createDepartmentYearCoursesDto,
        },
      );

      return departmentYearCourse;
    } catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException('Department year course already exists');
      }
      Logger.error(e);
      throw new BadRequestException('Could not create department year course');
    }
  }

  async getAllDepartmentYearCourses(): Promise<DepartmentYearCourses[]> {
    const departmentYearCourses = await this.departmentYearCoursesModel.findAll(
      {
        raw: true,
      },
    );

    return departmentYearCourses;
  }

  async updateDepartmentYearCourses(
    departmentYearCourseId: string,
    updateDepartmentYearCoursesDto: UpdateDepartmentYearCourseDto,
  ) {
    const departmentYearCourse = await this.departmentYearCoursesModel.findByPk(
      departmentYearCourseId,
    );

    if (!departmentYearCourse) {
      throw new NotFoundException('Department year course not found');
    }

    await departmentYearCourse.update(updateDepartmentYearCoursesDto);

    return departmentYearCourse;
  }

  async deleteDepartmentYearCourses(departmentYearCourseId: string) {
    const departmentYearCourse = await this.departmentYearCoursesModel.findByPk(
      departmentYearCourseId,
    );

    if (!departmentYearCourse) {
      throw new NotFoundException('Department year course not found');
    }

    await departmentYearCourse.destroy();

    return departmentYearCourseId;
  }
}
