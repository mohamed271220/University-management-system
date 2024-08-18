import { Request, Response } from "express";
import { CourseService } from "../services/courseService";
import Course from "../models/Course";
import User from "../models/User";
import Department from "../models/Department";

const courseService = new CourseService(Course);

export const createCourse = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const department = await Department.findByPk(req.body.departmentId);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    const professor = await User.findByPk(req.body.professorId);
    if (!professor) {
      return res.status(404).json({ message: "Professor not found" });
    }
    const course = await courseService.createCourse(data);
    if (!course) return res.status(400).json({ message: "Course not created" });
    res.status(201).json({ message: "Course created successfully", course });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await courseService.getAllCourses();
    res.status(200).json({ message: "All courses", courses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getCourseById = async (req: Request, res: Response) => {
  try {
    const course = await courseService.getCourseById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json({ message: "Course found", course });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateCourse = async (req: Request, res: Response) => {
  try {
    const updatedCourse = await courseService.updateCourse(
      req.params.id,
      req.body
    );
    if (!updatedCourse) {
      return res.status(400).json({ message: "Course not updated" });
    }
    res.status(200).json({ message: "Course updated", updatedCourse });
  } catch (error: any) {
    if (error.message === "Course not found" || error.message === "A course with this code already exists") {
      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const deletedCourse = await courseService.deleteCourse(req.params.id);
    res.status(200).json({ message: "Course deleted", deletedCourse });
  } catch (error: any) {
    if (error.message === "Course not found") {
      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getLecturesByCourseId = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.id;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }
    const courseLectures = await courseService.getLecturesByCourseId(courseId);

    res
      .status(200)
      .json({ message: "Lectures found", lectures: courseLectures });
  } catch (error: any) {
    if (error.message === "Course not found") {
      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
