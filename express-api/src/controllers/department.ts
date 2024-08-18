import { Request, Response } from "express";
import { DepartmentService } from "../services/departmentService";

const departmentService = new DepartmentService();

export const createDepartment = async (req: Request, res: Response) => {
  try {
    const department = await departmentService.createDepartment(req.body);
    if (!department) {
      return res.status(400).json({ message: "Department creation failed" });
    }
    res
      .status(201)
      .json({ message: "Department created successfully", department });
  } catch (error: any) {
    if (error.message === "Department already exists") {
      return res.status(400).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAllDepartments = async (req: Request, res: Response) => {
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
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getDepartmentById = async (req: Request, res: Response) => {
  try {
    const department = await departmentService.getDepartmentById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json({ message: "Department found", department });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateDepartment = async (req: Request, res: Response) => {
  try {
    const updatedDepartment = await departmentService.updateDepartment(
      req.params.id,
      req.body
    );
    res.status(200).json({ message: "Department updated", updatedDepartment });
  } catch (error: any) {
    if (error.message) {
      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteDepartment = async (req: Request, res: Response) => {
  try {
    const deletedDepartment = await departmentService.deleteDepartment(
      req.params.id
    );
    res.status(200).json({ message: "Department deleted", deletedDepartment });
  } catch (error: any) {
    if (error.message === "Department not found") {
      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCoursesByDepartment = async (req: Request, res: Response) => {
  try {
    const departmentId = req.params.id;
    if (!departmentId) {
      return res.status(400).json({ message: "Department ID is required" });
    }

    const courses = await departmentService.getCoursesByDepartment(
      departmentId
    );
    res.status(200).json({ message: "Courses found", courses });
  } catch (error: any) {
    if (error.message === "Department has no courses") {
      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getHallsByDepartment = async (req: Request, res: Response) => {
  try {
    const departmentId = req.params.id;
    if (!departmentId) {
      return res.status(400).json({ message: "Department ID is required" });
    }

    const halls = await departmentService.getHallsByDepartment(departmentId);
    res.status(200).json({ message: "Halls found", halls });
  } catch (error: any) {
    if (error.message === "Department has no halls") {
      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
