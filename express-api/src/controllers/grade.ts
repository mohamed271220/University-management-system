import { NextFunction, Request, Response } from "express";
import { GradeService } from "../services/gradeService";
import { userRequest } from "../interfaces";

const gradeService = new GradeService();

// api/v1/grades

export const createGrade = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId, courseId, semesterId, grade, date, description } =
      req.body;
    const { user } = req;
    const newGrade = await gradeService.createGrade(
      {
        studentId,
        courseId,
        semesterId,
        grade,
        date,
        description,
      },
      user
    );
    res
      .status(201)
      .json({ success: true, message: "Created grade successfully", newGrade });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export const getAllGrades = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;

    const { grades, pagination } = await gradeService.getAllGrades(
      limit,
      offset
    );
    res
      .status(200)
      .json({ success: true, message: "All grades", grades, pagination });
  } catch (error) {
    next(error);
  }
};

export const getGradeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const grade = await gradeService.getGradeById(id);
  res.status(200).json({ success: true, message: "Found the grade", grade });
  try {
  } catch (error) {
    next(error);
  }
};

export const getGradesByStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const grades = await gradeService.getGradesByStudent(studentId);
    res.status(200).json({
      success: true,
      message: "Fetched student's grades successfully",
      grades,
    });
  } catch (error) {
    next(error);
  }
};

export const getGradesByStudentAndSemester = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId, semesterId } = req.params;
    const grades = await gradeService.getGradesByStudentAndSemester(
      studentId,
      semesterId
    );
    res.status(200).json({
      success: true,
      message: "Fetched student's grades by semester",
      grades,
    });
  } catch (error) {
    next(error);
  }
};

export const updateGrade = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { studentId, courseId, semesterId, grade, date, description } =
      req.body;
    const updatedGrade = await gradeService.updateGrade(
      id,
      {
        studentId,
        courseId,
        semesterId,
        grade,
        date,
        description,
      },
      req.user
    );
    res.status(200).json({
      success: true,
      message: "Updated grade successfully",
      updatedGrade,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteGrade = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedGrade = await gradeService.deleteGrade(id);
    res.status(200).json({
      success: true,
      message: "Deleted grade successfully",
      deletedGrade,
    });
  } catch (error) {
    next(error);
  }
};

export const getGradesByCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courseId } = req.params;
    const grades = await gradeService.getGradesByCourse(courseId);
    res.status(200).json({
      success: true,
      message: "Fetched grades by course successfully",
      grades,
    });
  } catch (error) {
    next(error);
  }
};

export const getGradesBySemester = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { semesterId } = req.params;
    const grades = await gradeService.getGradesBySemester(semesterId);
    res.status(200).json({
      success: true,
      message: "Fetched grades by semester successfully",
      grades,
    });
  } catch (error) {
    next(error);
  }
};

export const getGradesByProfessor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { professorId } = req.params;
    const grades = await gradeService.getGradesByProfessor(professorId);
    res.status(200).json({
      success: true,
      message: "Fetched grades by professor successfully",
      grades,
    });
  } catch (error) {
    next(error);
  }
};
