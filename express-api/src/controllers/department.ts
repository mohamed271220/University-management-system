import { NextFunction, Request, Response } from "express";
import { DepartmentService } from "../services/departmentService";
import { CustomError } from "../utils/CustomError";

const departmentService = new DepartmentService();

export const createDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const department = await departmentService.createDepartment(req.body);
    if (!department) {
      throw new CustomError("Failed to create department", 500);
    }
    res
      .status(201)
      .json({ message: "Department created successfully", department });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};
export const getAllDepartments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
    const { departments, pagination } =
      await departmentService.getAllDepartments(limit, offset);
    res.status(200).json({
      message: "All departments",
      departments,
      pagination,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
export const getDepartmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const department = await departmentService.getDepartmentById(req.params.id);
    if (!department) {
      throw new CustomError("Department not found", 404);
    }
    res.status(200).json({ message: "Department found", department });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
export const updateDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedDepartment = await departmentService.updateDepartment(
      req.params.id,
      req.body
    );
    res.status(200).json({ message: "Department updated", updatedDepartment });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};
export const deleteDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedDepartment = await departmentService.deleteDepartment(
      req.params.id
    );
    res.status(200).json({ message: "Department deleted", deletedDepartment });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const getCoursesByDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const departmentId = req.params.id;
    if (!departmentId) {
      throw new CustomError("Department ID is required", 400);
    }

    const courses = await departmentService.getCoursesByDepartment(
      departmentId
    );
    res.status(200).json({ message: "Courses found", courses });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const getHallsByDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const departmentId = req.params.id;
    if (!departmentId) {
      throw new CustomError("Department ID is required", 400);
    }

    const halls = await departmentService.getHallsByDepartment(departmentId);
    res.status(200).json({ message: "Halls found", halls });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};
