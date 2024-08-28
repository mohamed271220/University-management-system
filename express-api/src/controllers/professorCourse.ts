import { NextFunction, Request, Response } from "express";
import { ProfessorCourseService } from "../services/professorCourseService";
import ProfessorCourse from "../models/ProfessorCourses";
import { CustomError } from "../utils/CustomError";

const professorCourseService = new ProfessorCourseService(ProfessorCourse);

export const createProfessorCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courseId, professorId } = req.params;
    if (!courseId || !professorId) {
      throw new CustomError("Please provide all required fields", 400);
    }
    const professorCourse = await professorCourseService.createProfessorCourse(
      courseId,
      professorId
    );
    res
      .status(201)
      .json({ message: "Professor course created", professorCourse });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const getAllCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courses = await professorCourseService.getAllCourses();
    res.status(200).json({ message: "All courses", courses });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getProfessorCourseById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const professorCourse = await professorCourseService.getProfessorCourseById(
      req.params.id
    );
    if (!professorCourse) {
      throw new CustomError("Professor course not found", 404);
    }
    res
      .status(200)
      .json({ message: "Professor course found", professorCourse });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const getAllProfessorCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const professorId = req.params.professorId;
    if (!professorId) {
      throw new CustomError("Professor ID is required", 400);
    }
    const professorCourses =
      await professorCourseService.getAllProfessorCourses(professorId);

    res
      .status(200)
      .json({ message: "All professor courses", professorCourses });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const getAllProfessorsByCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courseId = req.params.courseId;

    if (!courseId) {
      throw new CustomError("Course ID is required", 400);
    }

    const courseProf = await professorCourseService.getProfessorsByCourseId(
      courseId
    );

    res
      .status(200)
      .json({ message: "Professors found", professors: courseProf });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const deleteProfessorCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courseId, professorId } = req.params;
    await professorCourseService.deleteProfessorCourse(courseId, professorId);
    res.status(200).json({ message: "Professor course deleted successfully" });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};
