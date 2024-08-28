import { NextFunction, Request, Response } from "express";
import { CourseService } from "../services/courseService";
import Course from "../models/Course";
import User from "../models/User";
import Department from "../models/Department";
import { CustomError } from "../utils/CustomError";

const courseService = new CourseService(Course);

export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const department = await Department.findByPk(req.body.departmentId);
    if (!department) {
      throw new CustomError("Department not found", 404);
    }
    const professor = await User.findByPk(req.body.professorId);
    if (!professor) {
      throw new CustomError("Professor not found", 404);
    }
    const course = await courseService.createCourse(data);
    if (!course) throw new CustomError("Failed to create course", 500);
    res.status(201).json({ message: "Course created successfully", course });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

export const getAllCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courses = await courseService.getAllCourses();
    res.status(200).json({ message: "All courses", courses });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getCourseById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const course = await courseService.getCourseById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json({ message: "Course found", course });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedCourse = await courseService.updateCourse(
      req.params.id,
      req.body
    );
    if (!updatedCourse) {
      throw new CustomError("Course not found", 404);
    }
    res.status(200).json({ message: "Course updated", updatedCourse });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedCourse = await courseService.deleteCourse(req.params.id);
    res.status(200).json({ message: "Course deleted", deletedCourse });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const getLecturesByCourseId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courseId = req.params.id;

    if (!courseId) {
      throw new CustomError("Course ID is required", 400);
    }
    const courseLectures = await courseService.getLecturesByCourseId(courseId);

    res
      .status(200)
      .json({ message: "Lectures found", lectures: courseLectures });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};
