import { Request, Response } from "express";
import { DepartmentService } from "../services/departmentService";
import Department from "../models/Department";

const departmentService = new DepartmentService(Department);

export const createDepartment = async (req: Request, res: Response) => {
  try {
    const department = await departmentService.createDepartment(req.body);
    if (!department) {
      return res.status(400).json({ message: "Department creation failed" });
    }
    res
      .status(201)
      .json({ message: "Department created successfully", department });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAllDepartments = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};
export const getDepartmentById = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};
export const updateDepartment = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};
export const deleteDepartment = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};
export const getCoursesByDepartment = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};
export const getHallsByDepartment = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};
