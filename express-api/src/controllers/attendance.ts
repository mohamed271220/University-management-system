import { Request, Response } from "express";
import { AttendanceService } from "../services/attendanceService";
import { userRequest } from "../interfaces";

const attendanceService = new AttendanceService();

export const createAttendance = async (req: userRequest, res: Response) => {
  try {
    const user = req.user!;
    const { studentId, lectureId, status, lectureDate } = req.body;
    if (!studentId || !lectureId || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const attendanceRecord = await attendanceService.createAttendance(
      user,
      studentId,
      lectureId,
      status,
      lectureDate
    );

    res
      .status(201)
      .json({ message: "Signed student successfully", attendanceRecord });
  } catch (error: any) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Internal server error: " + error.message });
  }
};

export const getAllAttendances = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;

    const { attendanceRecords, pagination } =
      await attendanceService.getAllAttendances(limit, offset);
    res.status(200).json({
      message: "All attendance records",
      attendanceRecords,
      pagination,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAttendanceByStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    if (!studentId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const attendanceRecords = await attendanceService.getAttendanceByStudent(
      studentId
    );
    res
      .status(200)
      .json({ message: "Attendance records found", attendanceRecords });
  } catch (error: any) {
    if (error.message === "Attendance records not found") {
      return res.status(404).json({ message: error.message });
    }
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAttendanceByLecture = async (req: Request, res: Response) => {
  try {
    const { lectureId } = req.params;
    if (!lectureId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const attendanceRecords = await attendanceService.getAttendanceByLecture(
      lectureId
    );
    res
      .status(200)
      .json({ message: "Attendance records found", attendanceRecords });
  } catch (error: any) {
    if (error.message === "Attendance records not found") {
      return res.status(404).json({ message: error.message });
    }
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAttendanceByStudentAndLecture = async (
  req: Request,
  res: Response
) => {
  try {
    const { studentId, lectureId } = req.params;
    if (!studentId || !lectureId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const attendanceRecord =
      await attendanceService.getAttendanceByStudentAndLecture(
        studentId,
        lectureId
      );
    res
      .status(200)
      .json({ message: "Attendance record found", attendanceRecord });
  } catch (error: any) {
    if (error.message === "Attendance record not found") {
      return res.status(404).json({ message: error.message });
    }
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAttendanceStatus = async (req: Request, res: Response) => {
  try {
    const { attendanceRecordId } = req.params;
    const { status } = req.body;
    if (!attendanceRecordId || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const attendanceRecord = await attendanceService.updateAttendanceStatus(
      attendanceRecordId,
      status
    );
    res
      .status(200)
      .json({ message: "Attendance record updated", attendanceRecord });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAttendance = async (req: Request, res: Response) => {
  try {
    const { attendanceRecordId } = req.params;
    if (!attendanceRecordId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    await attendanceService.deleteAttendance(attendanceRecordId);
    res.status(200).json({ message: "Attendance record deleted" });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
