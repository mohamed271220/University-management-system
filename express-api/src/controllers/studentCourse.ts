import { NextFunction, Request, Response } from "express";
import { StudentCourseService } from "../services/studentCourseService";
import StudentCourse from "../models/StudentCourses";
import { userRequest } from "../interfaces";
import { CustomError } from "../utils/CustomError";

const studentCourseService = new StudentCourseService(StudentCourse);

export const enrollCourses = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const { courses, semesterId } = req.body;

    if (
      studentId !== req.user?.id &&
      req.user?.role !== "student" &&
      req.user?.role !== "admin"
    ) {
      throw new CustomError("Unauthorized", 401);
    }

    if (!studentId || !courses || !semesterId) {
      throw new CustomError("Please provide all required fields", 400);
    }

    const studentCourses = await studentCourseService.enrollCourses(
      studentId,
      courses,
      semesterId
    );
    res.status(201).json({ message: "Courses enrolled", studentCourses });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const getAllCoursesByStudentId = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentId = req.params.studentId;

    if (
      studentId !== req.user?.id &&
      req.user?.role !== "student" &&
      req.user?.role !== "admin"
    ) {
      throw new CustomError("Unauthorized", 401);
    }

    if (!studentId) {
      throw new CustomError("Student ID is required", 400);
    }
    const studentCourses =
      await studentCourseService.getStudentCoursesByStudentId(studentId);
    res.status(200).json({ message: "Courses found", courses: studentCourses });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const getAllStudentsByCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courseId = req.params.courseId;

    if (!courseId) {
      throw new CustomError("Course ID is required", 400);
    }
    const courseStudents = await studentCourseService.getStudentsByCourseId(
      courseId
    );
    res
      .status(200)
      .json({ message: "Students found", students: courseStudents });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const getStudentCourseById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId, courseId } = req.params;

    if (!studentId || !courseId) {
      throw new CustomError("Student ID and Course ID are required", 400);
    }

    const studentCourse = await studentCourseService.getStudentCourseById(
      studentId,
      courseId
    );
    if (!studentCourse) {
      throw new CustomError("Student course not found", 404);
    }
    res.status(200).json({ message: "Student course found", studentCourse });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const updateStudentCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId, courseId } = req.params;
    const { semesterId } = req.body;

    if (!studentId || !courseId || !semesterId) {
      throw new CustomError(
        "Student ID, Course ID, and Semester ID are required",
        400
      );
    }

    const studentCourse = await studentCourseService.updateStudentCourse(
      studentId,
      courseId,
      semesterId
    );
    res
      .status(200)
      .json({ message: "Student enrollment updated", studentCourse });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const deleteStudentCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId, courseId } = req.params;

    if (!studentId || !courseId) {
      throw new CustomError("Student ID and Course ID are required", 400);
    }

    await studentCourseService.deleteStudentCourse(studentId, courseId);
    res.status(204).end();
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};
