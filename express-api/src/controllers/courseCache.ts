import { NextFunction, Request, Response } from "express";
import { CourseCacheService } from "../services/courseCacheService";

const courseCacheService = new CourseCacheService();

export const createCourseCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courseCache = await courseCacheService.createCourseCache(req.body);
    res
      .status(201)
      .json({ message: "Course cache created successfully", courseCache });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};
export const getCourseCacheById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const courseCache = await courseCacheService.getCourseCacheById(id);
    res
      .status(200)
      .json({ message: "Course cache fetched successfully", courseCache });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const getAllCourseCaches = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courseCaches = await courseCacheService.getAllCourseCaches();
    res
      .status(200)
      .json({ message: "Course caches fetched successfully", courseCaches });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const getCourseCacheByCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courseId } = req.params;
    const courseCaches = await courseCacheService.getCourseCacheByCourse(
      courseId
    );
    res
      .status(200)
      .json({ message: "Course caches fetched successfully", courseCaches });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const getCourseCacheByDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { departmentId } = req.params;
    const courseCaches = await courseCacheService.getCourseCacheByDepartment(
      departmentId
    );
    res
      .status(200)
      .json({ message: "Course caches fetched successfully", courseCaches });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const updateCourseCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courseCache = await courseCacheService.updateCourseCache(req.body);
    res
      .status(200)
      .json({ message: "Course cache updated successfully", courseCache });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const deleteCourseCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const courseCache = await courseCacheService.deleteCourseCache(id);
    res
      .status(200)
      .json({ message: "Course cache deleted successfully", courseCache });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};
