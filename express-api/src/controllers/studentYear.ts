import { Request, Response } from "express";
import { StudentYearService } from "../services/studentYearService";

const studentYearService = new StudentYearService();

export const createStudentYear = async (req: Request, res: Response) => {
  try {
    const studentYear = req.body;
    const newStudentYear = await studentYearService.createStudentYear(
      studentYear
    );
    res
      .status(201)
      .json({ message: "Student year created", studentYear: newStudentYear });
  } catch (error: any) {
    if (error.message) {
      return res.status(400).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllStudentYears = async (req: Request, res: Response) => {
  try {
    const studentYears = await studentYearService.getAllStudentYears();
    res.status(200).json({ studentYears });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getYearRecordsByStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const studentYears = await studentYearService.getYearRecordsByStudent(
      studentId
    );
    res.status(200).json({ studentYears });
  } catch (error: any) {
    if (error.message) {
      return res.status(400).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateStudentYear = async (req: Request, res: Response) => {
  try {
    const studentYear = req.body;
    const { studentYearId } = req.params;
    const updatedStudentYear = await studentYearService.updateStudentYear(
      studentYearId,
      studentYear
    );
    res
      .status(200)
      .json({
        message: "Student year updated",
        studentYear: updatedStudentYear,
      });
  } catch (error: any) {
    if (error.message) {
      return res.status(400).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteStudentYear = async (req: Request, res: Response) => {
  try {
    const { studentYearId } = req.params;
    await studentYearService.deleteStudentYear(studentYearId);
    res.status(200).json({ message: "Student year deleted" });
  } catch (error: any) {
    if (error.message) {
      return res.status(400).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
