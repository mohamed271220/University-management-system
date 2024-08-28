import { NextFunction, Request, Response } from "express";
import { HallService } from "../services/hallService";
import { CustomError } from "../utils/CustomError";

const hallService = new HallService();

export const createHall = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, isLab, departmentId } = req.body;
    if (!name || isLab === undefined || !departmentId) {
      throw new CustomError("Please provide all required fields", 400);
    }
    const hall = await hallService.createHall(name, isLab, departmentId);
    res.status(201).json({ message: "Hall created", hall });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const getAllHalls = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const halls = await hallService.getAllHalls();
    res.status(200).json({ message: "All halls", halls });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getHallById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hall = await hallService.getHallById(req.params.hallId);
    if (!hall) {
      throw new CustomError("Hall not found", 404);
    }
    res.status(200).json({ message: "Hall found", hall });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const updateHall = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, isLab, departmentId } = req.body;
    const hall = await hallService.updateHall(
      req.params.hallId,
      name,
      isLab,
      departmentId
    );
    if (!hall) {
      throw new CustomError("Hall not found", 404);
    }
    res.status(200).json({ message: "Hall updated", hall });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const deleteHall = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hall = await hallService.deleteHall(req.params.hallId);
    res.status(200).json({ message: "Hall deleted", hall });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const getLecturesByHall = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const lectures = await hallService.getLecturesByHall(req.params.hallId);
    res.status(200).json({ message: "All lectures", lectures });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};
