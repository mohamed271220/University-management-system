import { NextFunction, Request, Response } from "express";
import UserService from "../services/userService";
import { userRequest } from "../interfaces/index";

const userService = new UserService();

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
    const { users, pagination } = await userService.getAllUsers(limit, offset);

    res
      .status(200)
      .json({ message: "Users retrieved successfully", users, pagination });
  } catch (error: any) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json({ message: "User found successfully", user });
  } catch (error: any) {
    next(error);
  }
};

export const updateUser = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedUser = await userService.updateUser(
      req.params.id,
      req.body,
      req
    );
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error: any) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    next(error);
  }
};
