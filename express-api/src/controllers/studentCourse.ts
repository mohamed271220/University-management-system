import { Request, Response } from "express";
import { StudentCourseService } from "../services/studentCourseService";
import StudentCourse from "../models/StudentCourses";
import { userRequest } from "../interfaces";

const studentCourseService = new StudentCourseService(StudentCourse);

export const enrollCourses = async (req: userRequest, res: Response) => {
  try {
    const { studentId } = req.params;
    const { courses, semesterId } = req.body;

    if (studentId !== req.user?.id && req.user?.role !== "student") {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (!studentId || !courses || !semesterId) {
      return res
        .status(400)
        .json({ message: "Student ID and courses are required" });
    }

    const studentCourses = await studentCourseService.enrollCourses(
      studentId,
      courses,
      semesterId
    );
    res.status(201).json({ message: "Courses enrolled", studentCourses });
  } catch (error: any) {
    if (error.message) {
      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllCoursesByStudentId = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;

    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required" });
    }
    const studentCourses =
      await studentCourseService.getStudentCoursesByStudentId(studentId);
    res.status(200).json({ message: "Courses found", courses: studentCourses });
  } catch (error: any) {
    if (error.message === "Student not found") {
      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllStudentsByCourse = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.courseId;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }
    const courseStudents = await studentCourseService.getStudentsByCourseId(
      courseId
    );
    res
      .status(200)
      .json({ message: "Students found", students: courseStudents });
  } catch (error: any) {
    if (error.message === "Course not found") {
      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getStudentCourseById = async (req: Request, res: Response) => {
  try {
    const { studentId, courseId } = req.params;

    if (!studentId || !courseId) {
      return res
        .status(400)
        .json({ message: "Student ID and Course ID are required" });
    }

    const studentCourse = await studentCourseService.getStudentCourseById(
      studentId,
      courseId
    );
    if (!studentCourse) {
      return res.status(404).json({ message: "Student course not found" });
    }
    res.status(200).json({ message: "Student course found", studentCourse });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateStudentCourse = async (req: Request, res: Response) => {
  try {
    const { studentId, courseId } = req.params;
    const { semesterId } = req.body;

    if (!studentId || !courseId || !semesterId) {
      return res.status(400).json({
        message: "Student ID, Course ID, and Semester ID are required",
      });
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
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteStudentCourse = async (req: Request, res: Response) => {
  try {
    const { studentId, courseId } = req.params;

    if (!studentId || !courseId) {
      return res
        .status(400)
        .json({ message: "Student ID and Course ID are required" });
    }

    await studentCourseService.deleteStudentCourse(studentId, courseId);
    res.status(204).end();
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
