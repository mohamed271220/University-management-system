import { NextFunction, Request, Response } from "express";
import { SemesterService } from "../services/semesterService";
import { CustomError } from "../utils/CustomError";

const semesterService = new SemesterService();

export const createSemester = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, startDate, endDate } = req.body;
    const semester = await semesterService.createSemester(
      name,
      startDate,
      endDate
    );
    if (!semester) {
      throw new CustomError("Semester not created", 500);
    }

    res.status(201).json({
      message: "Semester created successfully",
      semester,
    });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const getAllSemesters = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const semesters = await semesterService.getAllSemesters();
    res.status(200).json({ semesters });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const getSemesterById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { semesterId } = req.params;
    if (!semesterId) {
      throw new CustomError("Semester ID is required", 400);
    }
    const semester = await semesterService.getSemesterById(semesterId);
    res.status(200).json({ semester });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const updateSemester = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { semesterId } = req.params;
    const { name, startDate, endDate } = req.body;
    const semester = await semesterService.updateSemester(
      semesterId,
      name,
      startDate,
      endDate
    );
    res
      .status(200)
      .json({ message: "Semester updated successfully", semester });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const deleteSemester = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { semesterId } = req.params;
    if (!semesterId) {
      throw new CustomError("Semester ID is required", 400);
    }
    await semesterService.deleteSemester(semesterId);
    res.status(200).json({ message: "Semester deleted successfully" });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const getSemesterGrades = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { semesterId } = req.params;
    if (!semesterId) {
      throw new CustomError("Semester ID is required", 400);
    }
    const grades = await semesterService.getSemesterGrades(semesterId);
    res.status(200).json({ grades });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const getStudentEnrolledCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { semesterId } = req.params;
    if (!semesterId) {
      throw new CustomError("Semester ID is required", 400);
    }
    const studentCourses = await semesterService.getStudentEnrolledCourses(
      semesterId
    );
    res.status(200).json({ studentCourses });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};
