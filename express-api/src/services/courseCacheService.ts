import CourseCache from "../models/CourseCache";
import { v4 as uuid } from "uuid";
import { CustomError } from "../utils/CustomError";
import Course from "../models/Course";
import Department from "../models/Department";

export class CourseCacheService {
  constructor(
    private courseCacheRepository: typeof CourseCache = CourseCache
  ) {}

  async createCourseCache(courseCache: any) {
    const { courseId, courseName, professorName, departmentName } = courseCache;
    const existingCourseCache = await this.courseCacheRepository.findOne({
      where: { courseId },
    });

    if (existingCourseCache) {
      throw new CustomError("Course cache already exists", 400);
    }

    const course = await Course.findByPk(courseId);
    if (!course) {
      throw new CustomError("Course not found", 404);
    }
    const courseCacheEntry = await this.courseCacheRepository.create({
      id: uuid(),
      courseId,
      courseName,
      professorName,
      departmentName,
    });
    return courseCacheEntry;
  }

  async getCourseCacheById(id: string) {
    const courseCache = await this.courseCacheRepository.findByPk(id);
    if (!courseCache) {
      throw new CustomError("Course cache not found", 404);
    }
    return courseCache;
  }

  async getAllCourseCaches() {
    const courseCaches = await this.courseCacheRepository.findAll();
    return courseCaches;
  }

  async getCourseCacheByCourse(courseId: string) {
    const [courseCaches, course] = await Promise.all([
      this.courseCacheRepository.findAll({
        where: { courseId },
      }),
      Course.findByPk(courseId),
    ]);
    if (!course) {
      throw new CustomError("Course not found", 404);
    }

    if (!courseCaches) {
      throw new CustomError("Course cache not found", 404);
    }

    return courseCaches;
  }

  async getCourseCacheByDepartment(departmentId: string) {
    const department = await Department.findByPk(departmentId);
    if (!department) {
      throw new CustomError("Department not found", 404);
    }
    const courseCaches = await this.courseCacheRepository.findAll({
      where: {
        departmentName: department.name,
      },
    });
    if (!courseCaches) {
      throw new CustomError("Course cache not found", 404);
    }
    return courseCaches;
  }

  async updateCourseCache(courseCache: any) {
    const { courseId, courseName, professorName, departmentName } = courseCache;
    const existingCourseCache = await this.courseCacheRepository.findOne({
      where: { courseId },
    });

    if (!existingCourseCache) {
      throw new CustomError("Course cache not found", 404);
    }

    const course = await Course.findByPk(courseId);
    if (!course) {
      throw new CustomError("Course not found", 404);
    }

    await existingCourseCache.update({
      courseName,
      professorName,
      departmentName,
    });

    return existingCourseCache;
  }

  async deleteCourseCache(id: string) {
    const courseCache = await this.courseCacheRepository.findByPk(id);
    if (!courseCache) {
      throw new CustomError("Course cache not found", 404);
    }
    await courseCache.destroy();
    return courseCache;
  }
}
