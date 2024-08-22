import { Request, Response } from "express";
import { TimetableService } from "../services/timetableService";
import { Year } from "../interfaces";

const timetableService = new TimetableService();

export const getStudentTimetable = async (req: Request, res: Response) => {
  try {
    const { studentId, semesterId } = req.params;

    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    const timetable = await timetableService.getStudentTimetable(
      studentId,
      semesterId
    );

    if (!timetable) {
      return res.status(404).json({ message: "Student timetable not found" });
    }

    res.status(200).json({ message: "Student timetable found", timetable });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProfessorTimetable = async (req: Request, res: Response) => {
  try {
    const { professorId } = req.params;

    if (!professorId) {
      return res.status(400).json({ message: "Professor ID is required" });
    }

    const timetable = await timetableService.getProfessorTimetable(professorId);

    if (!timetable) {
      return res.status(404).json({ message: "Professor timetable not found" });
    }

    res.status(200).json({ message: "Professor timetable found", timetable });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getDepartmentTimetable = async (req: Request, res: Response) => {
  try {
    const { departmentId } = req.params;

    if (!departmentId) {
      return res.status(400).json({ message: "Department ID is required" });
    }

    const timetable = await timetableService.getDepartmentTimetable(
      departmentId
    );

    if (!timetable) {
      return res
        .status(404)
        .json({ message: "Department timetable not found" });
    }

    res.status(200).json({ message: "Department timetable found", timetable });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getHallTimetable = async (req: Request, res: Response) => {
  try {
    const { hallId } = req.params;

    if (!hallId) {
      return res.status(400).json({ message: "Hall ID is required" });
    }

    const timetable = await timetableService.getHallTimetable(hallId);

    if (!timetable) {
      return res.status(404).json({ message: "Hall timetable not found" });
    }

    res.status(200).json({ message: "Hall timetable found", timetable });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getDepartmentYearTimetable = async (
  req: Request,
  res: Response
) => {
  try {
    const departmentId = req.params.departmentId;
    const year = req.query.year as Year;

    if (!departmentId || !year) {
      return res
        .status(400)
        .json({ message: "Department ID and year are required" });
    }

    const timetable = await timetableService.getDepartmentYearTimetable(
      departmentId,
      year
    );

    if (!timetable) {
      return res
        .status(404)
        .json({ message: "Student year timetable not found" });
    }

    res
      .status(200)
      .json({ message: "Student year timetable found", timetable });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
