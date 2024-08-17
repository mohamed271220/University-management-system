import { Request, Response } from "express";
import UserService from "../services/userService";
import { userRequest } from "../interfaces/index";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
    const users = await UserService.getAllUsers(limit, offset);
    res.status(200).json({ message: "Users retrieved successfully", users });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    res.status(200).json({ message: "User found successfully", user });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req: userRequest, res: Response) => {
  try {
    const updatedUser = await UserService.updateUser(
      req.params.id,
      req.body,
      req
    );
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await UserService.deleteUser(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
