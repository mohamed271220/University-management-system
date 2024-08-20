import { Request, Response } from "express";
import { HallService } from "../services/hallService";

const hallService = new HallService();

export const createHall = async (req: Request, res: Response) => {
  try {
    const { name, isLab, departmentId } = req.body;
    if (!name || isLab === undefined || !departmentId) {
      return res
        .status(400)
        .json({ message: "Name and capacity are required" });
    }
    const hall = await hallService.createHall(name, isLab, departmentId);
    res.status(201).json({ message: "Hall created", hall });
  } catch (error: any) {
    if (error.message) {
      console.log(error);
      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllHalls = async (req: Request, res: Response) => {
  try {
    const halls = await hallService.getAllHalls();
    res.status(200).json({ message: "All halls", halls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getHallById = async (req: Request, res: Response) => {
  try {
    const hall = await hallService.getHallById(req.params.hallId);
    if (!hall) {
      return res.status(404).json({ message: "Hall not found" });
    }
    res.status(200).json({ message: "Hall found", hall });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateHall = async (req: Request, res: Response) => {
  try {
    const { name, isLab, departmentId } = req.body;
    const hall = await hallService.updateHall(
      req.params.hallId,
      name,
      isLab,
      departmentId
    );
    if (!hall) {
      return res.status(404).json({ message: "Hall not found" });
    }
    res.status(200).json({ message: "Hall updated", hall });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteHall = async (req: Request, res: Response) => {
  try {
    const hall = await hallService.deleteHall(req.params.hallId);
    if (!hall) {
      return res.status(404).json({ message: "Hall not found" });
    }
    res.status(200).json({ message: "Hall deleted", hall });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getLecturesByHall = async (req: Request, res: Response) => {
  try {
    const lectures = await hallService.getLecturesByHall(req.params.hallId);
    res.status(200).json({ message: "All lectures", lectures });
  } catch (error: any) {
    if (error.message) {
      console.log(error);
      return res.status(404).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
