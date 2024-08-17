import { Request, Response } from "express";
import { SemesterService } from "../services/semesterService";
import Semester from "../models/Semester";

const semesterService = new SemesterService(Semester);

export const createSemester = async (req: Request, res: Response) => {
  try {
    const { name, startDate, endDate } = req.body;
    if (!name || !startDate || !endDate) {
      return res.status(400).json({
        message: "Semester name, start date, and end date are required",
      });
    }
    const semester = await semesterService.createSemester(
      name,
      startDate,
      endDate
    );

    if (!semester) {
      return res.status(500).json({ message: "Failed to create semester" });
    }

    res.status(201).json({
      message: "Semester created successfully",
      semester,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAllSemesters = () => {};
export const getSemesterById = () => {};
export const updateSemester = () => {};
export const deleteSemester = () => {};
export const getSemesterGrades = () => {};
export const getStudentEnrolledCourses = () => {};
