import { Request, Response } from "express";
import { ProfessorCourseService } from "../services/professorCourse";
import ProfessorCourse from "../models/ProfessorCourses";

const professorCourseService = new ProfessorCourseService(ProfessorCourse);

export const createProfessorCourse = async (req: Request, res: Response) => {
  try {
    const { courseId, professorId } = req.params;
    if (!courseId || !professorId) {
      return res
        .status(400)
        .json({ message: "Course ID and Professor ID are required" });
    }
    const professorCourse = await professorCourseService.createProfessorCourse(
      courseId,
      professorId
    );
    res
      .status(201)
      .json({ message: "Professor course created", professorCourse });
  } catch (error: any) {
    if (error.message === "Course not found") {
      console.log(error);

      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await professorCourseService.getAllCourses();
    res.status(200).json({ message: "All courses", courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getProfessorCourseById = async (req: Request, res: Response) => {
  try {
    const professorCourse = await professorCourseService.getProfessorCourseById(
      req.params.id
    );
    if (!professorCourse) {
      return res.status(404).json({ message: "Professor course not found" });
    }
    res
      .status(200)
      .json({ message: "Professor course found", professorCourse });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAllProfessorCourses = async (req: Request, res: Response) => {
  try {
    const professorId = req.params.professorId;
    if (!professorId) {
      return res.status(400).json({ message: "Professor ID is required" });
    }
    const professorCourses =
      await professorCourseService.getAllProfessorCourses(professorId);

    res
      .status(200)
      .json({ message: "All professor courses", professorCourses });
  } catch (error: any) {
    if (error.message === "Professor not found") {
      console.log(error);

      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllProfessorsByCourse = async (req: Request, res: Response) => {
  try {
    const courseId = req.params.courseId;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const courseProf = await professorCourseService.getProfessorsByCourseId(
      courseId
    );

    res
      .status(200)
      .json({ message: "Professors found", professors: courseProf });
  } catch (error: any) {
    if (error.message === "Course not found") {
      console.log(error);

      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProfessorCourse = async (req: Request, res: Response) => {
  try {
    const { courseId, professorId } = req.params;
    await professorCourseService.deleteProfessorCourse(courseId, professorId);
    res.status(200).json({ message: "Professor course deleted successfully" });
  } catch (error: any) {
    if (error.message === "Professor course not found") {
      console.log(error);

      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
