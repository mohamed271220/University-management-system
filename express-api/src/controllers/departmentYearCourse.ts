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
  } catch (error: any) {
    console.log(error.message);
    next(error);
  }
};
