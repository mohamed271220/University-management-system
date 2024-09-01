import { Request, Response } from "express";
import { Year } from "../interfaces";
import { v4 as uuid } from "uuid";
import DepartmentYearCourses from "../models/DepartmentYearCourses";
import Department from "../models/Department";
import Course from "../models/Course";
import { CustomError } from "../utils/CustomError";

export class DepartmentYearCoursesService {
  constructor(
    private departmentYearCoursesModel: typeof DepartmentYearCourses = DepartmentYearCourses
  ) {}

  async addCourseToDepartmentYear(
    departmentId: string,
    courseId: string,
    year: Year
  ) {
    const [department, course] = await Promise.all([
      Department.findByPk(departmentId),
      Course.findByPk(courseId),
    ]);
    if (!department) {
      throw new CustomError("Department not found", 404);
    }
    if (!course) {
      throw new CustomError("Course not found", 404);
    }

    const departmentYearCourse = await this.departmentYearCoursesModel.create({
      id: uuid(),
      departmentId,
      courseId,
      year,
    });
    if (!departmentYearCourse) {
      throw new CustomError(
        "Failed to add course to department specific year",
        500
      );
    }
    return departmentYearCourse;
  }

  async getCoursesByDepartmentYear(departmentId: string, year: Year) {
    const department = await Department.findByPk(departmentId);
    if (!department) {
      throw new CustomError("Department not found", 404);
    }
    const departmentYearCourses = await this.departmentYearCoursesModel.findAll(
      {
        where: { departmentId, year },
        include: [Department, Course],
      }
    );
    if (!departmentYearCourses) {
      throw new CustomError(
        "Courses not found for department specific year",
        404
      );
    }
    return departmentYearCourses;
  }

  async editCourseForDepartmentYear(
    id: string,
    departmentId: string,
    courseId: string,
    year: Year
  ) {
    const departmentYearCourse = await this.departmentYearCoursesModel.findByPk(
      id
    );
    if (!departmentYearCourse) {
      throw new CustomError("Course not found", 404);
    }
    const [department, course] = await Promise.all([
      Department.findByPk(departmentId),
      Course.findByPk(courseId),
    ]);
    if (!department && departmentId) {
      throw new CustomError("Department not found", 404);
    }

    if (!course && courseId) {
      throw new CustomError("Course not found", 404);
    }
    const updatedDepartmentYearCourse = await departmentYearCourse.update({
      departmentId,
      courseId,
      year,
    });
    if (!updatedDepartmentYearCourse) {
      throw new CustomError(
        "Failed to update course for department specific year",
        500
      );
    }
    return updatedDepartmentYearCourse;
  }

  async deleteCourseForDepartmentYear(id: string) {
    const departmentYearCourse = await this.departmentYearCoursesModel.findByPk(
      id
    );
    if (!departmentYearCourse) {
      throw new CustomError("Course not found", 404);
    }
    const deletedDepartmentYearCourse = await departmentYearCourse.destroy();
  }
}
