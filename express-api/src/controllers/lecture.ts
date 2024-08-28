import { NextFunction, Request, Response } from "express";
import { LectureService } from "../services/lectureService";
import { lectureType } from "../interfaces";

const lectureService = new LectureService();

export const createLecture = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      professorId,
      hallId,
      courseId,
      dayOfWeek,
      startTime,
      endTime,
      recurrencePattern,
      recurrenceEndDate,
    } = req.body;

    const lecture = await lectureService.createLecture({
      professorId,
      hallId,
      courseId,
      dayOfWeek,
      startTime,
      endTime,
      recurrencePattern,
      recurrenceEndDate,
    } as lectureType);

    res.status(201).json({ message: "Lecture created successfully", lecture });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

export const getAllLectures = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
    const querySearch = req.query.search ? (req.query.search as string) : "";
    const { lectures, pagination } = await lectureService.getAllLectures(
      offset,
      limit,
      querySearch
    );
    res.status(200).json({
      message: "Lectures retrieved successfully",
      lectures,
      pagination,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getLectureById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { lectureId } = req.params;
    const lecture = await lectureService.getLectureById(lectureId);
    res
      .status(200)
      .json({ message: "Lecture retrieved successfully", lecture });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateLecture = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { lectureId } = req.params;
    const {
      professorId,
      hallId,
      courseId,
      dayOfWeek,
      startTime,
      endTime,
      recurrencePattern,
      recurrenceEndDate,
    } = req.body;

    const updatedLecture = await lectureService.updateLecture(lectureId, {
      professorId,
      hallId,
      courseId,
      dayOfWeek,
      startTime,
      endTime,
      recurrencePattern,
      recurrenceEndDate,
    } as lectureType);
    res.status(200).json({
      message: "Lecture updated successfully",
      lecture: updatedLecture,
    });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

export const deleteLecture = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { lectureId } = req.params;
    await lectureService.deleteLecture(lectureId);
    res.status(200).json({ message: "Lecture deleted successfully" });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

export const getAttendanceByLecture = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { lectureId } = req.params;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
    const { attendance, pagination } =
      await lectureService.getAttendanceByLecture(lectureId, offset, limit);
    res.status(200).json({
      message: "Attendance retrieved successfully",
      attendance,
      pagination,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const archiveLecture = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { lectureId } = req.params;
    await lectureService.archiveLecture(lectureId);
    res.status(200).json({ message: "Lecture archived successfully" });
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

// TODO
export const getHistoryByLecture = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { lectureId } = req.params;
    const history = await lectureService.getLectureHistory(lectureId);
    res
      .status(200)
      .json({ message: "History retrieved successfully", history });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
