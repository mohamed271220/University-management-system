import { NextFunction, Request, Response } from "express";
import { DepartmentYearCoursesService } from "../services/departmentYearCoursesService";

const departmentYearCoursesService = new DepartmentYearCoursesService();

export const addCourseToDepartmentYear = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { departmentId, courseId, year } = req.body;
    const course = await departmentYearCoursesService.addCourseToDepartmentYear(
      departmentId,
      courseId,
      year
    );
    res.status(201).json({
      success: true,
      message: "Course added to department specific year",
      data: course,
    });
  } catch (error: any) {
    console.log(error.message);
    next(error);
  }
};

export const getCoursesByDepartmentYear = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { departmentId, year } = req.body;
    const courses =
      await departmentYearCoursesService.getCoursesByDepartmentYear(
        departmentId,
        year
      );
    res.status(200).json({
      success: true,
      message: "Courses found for department specific year",
      data: courses,
    });
  } catch (error: any) {
    console.log(error.message);
    next(error);
  }
};

export const editCourseForDepartmentYear = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { departmentId, courseId, year } = req.body;
    const course =
      await departmentYearCoursesService.editCourseForDepartmentYear(
        id,
        departmentId,
        courseId,
        year
      );
    res.status(200).json({
      success: true,
      message: "Course edited for department specific year",
      course,
    });
  } catch (error: any) {
    console.log(error.message);
    next(error);
  }
};

export const deleteCourseForDepartmentYear = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await departmentYearCoursesService.deleteCourseForDepartmentYear(id);
    res.status(200).json({
      success: true,
      message: "Course deleted for department specific year",
    });
  } catch (error: any) {
    console.log(error.message);
    next(error);
  }
};
