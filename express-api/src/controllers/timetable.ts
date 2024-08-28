import { NextFunction, Request, Response } from "express";
import { TimetableService } from "../services/timetableService";
import { Year } from "../interfaces";
import { CustomError } from "../utils/CustomError";

const timetableService = new TimetableService();

export const getStudentTimetable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId, semesterId } = req.params;

    if (!studentId) {
      throw new CustomError("Student ID is required", 400);
    }

    const timetable = await timetableService.getStudentTimetable(
      studentId,
      semesterId
    );

    if (!timetable) {
      throw new CustomError("Student timetable not found", 404);
    }

    res.status(200).json({ message: "Student timetable found", timetable });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const getProfessorTimetable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { professorId } = req.params;

    if (!professorId) {
      throw new CustomError("Professor ID is required", 400);
    }

    const timetable = await timetableService.getProfessorTimetable(professorId);

    if (!timetable) {
      throw new CustomError("Professor timetable not found", 404);
    }

    res.status(200).json({ message: "Professor timetable found", timetable });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const getDepartmentTimetable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { departmentId } = req.params;

    if (!departmentId) {
      throw new CustomError("Department ID is required", 400);
    }

    const timetable = await timetableService.getDepartmentTimetable(
      departmentId
    );

    if (!timetable) {
      throw new CustomError("Department timetable not found", 404);
    }

    res.status(200).json({ message: "Department timetable found", timetable });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const getHallTimetable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { hallId } = req.params;

    if (!hallId) {
      throw new CustomError("Hall ID is required", 400);
    }

    const timetable = await timetableService.getHallTimetable(hallId);

    if (!timetable) {
      throw new CustomError("Hall timetable not found", 404);
    }

    res.status(200).json({ message: "Hall timetable found", timetable });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const getDepartmentYearTimetable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const departmentId = req.params.departmentId;
    const year = req.query.year as Year;

    if (!departmentId || !year) {
      throw new CustomError("Department ID and year are required", 400);
    }

    const timetable = await timetableService.getDepartmentYearTimetable(
      departmentId,
      year
    );

    if (!timetable) {
      throw new CustomError("Department year timetable not found", 404);
    }

    res
      .status(200)
      .json({ message: "Student year timetable found", timetable });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};
