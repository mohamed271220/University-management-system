import { Request, Response } from "express";
import { SemesterService } from "../services/semesterService";
import Semester from "../models/Semester";

const semesterService = new SemesterService(Semester);

export const createSemester = async (req: Request, res: Response) => {
  try {
    const { name, startDate, endDate } = req.body;
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

export const getAllSemesters = async (req: Request, res: Response) => {
  try {
    const semesters = await semesterService.getAllSemesters();
    res.status(200).json({ semesters });
  } catch (error: any) {
    if (error.message) {
      return res.status(404).json({ message: "No semesters found" });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSemesterById = async (req: Request, res: Response) => {
  try {
    const { semesterId } = req.params;
    if (!semesterId) {
      return res.status(400).json({ message: "Semester ID is required" });
    }
    const semester = await semesterService.getSemesterById(semesterId);
    res.status(200).json({ semester });
  } catch (error: any) {
    if (error.message) {
      return res.status(404).json({ message: "Semester not found" });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateSemester = async (req: Request, res: Response) => {
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
    if (error.message) {
      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteSemester = async (req: Request, res: Response) => {
  try {
    const { semesterId } = req.params;
    if (!semesterId) {
      return res.status(400).json({ message: "Semester ID is required" });
    }
    const semester = await semesterService.deleteSemester(semesterId);
    if (!semester) {
      return res.status(404).json({ message: "Semester not found" });
    }
    res.status(200).json({ message: "Semester deleted successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSemesterGrades = async (req: Request, res: Response) => {
  try {
    const { semesterId } = req.params;
    if (!semesterId) {
      return res.status(400).json({ message: "Semester ID is required" });
    }
    const grades = await semesterService.getSemesterGrades(semesterId);
    res.status(200).json({ grades });
  } catch (error: any) {
    if (error.message) {
      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getStudentEnrolledCourses = async (
  req: Request,
  res: Response
) => {
  try {
    const { semesterId } = req.params;
    if (!semesterId) {
      return res.status(400).json({ message: "Semester ID is required" });
    }
    const studentCourses = await semesterService.getStudentEnrolledCourses(
      semesterId
    );
    res.status(200).json({ studentCourses });
  } catch (error: any) {
    if (error.message) {
      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
