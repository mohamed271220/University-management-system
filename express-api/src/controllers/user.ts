import { Request, Response } from "express";
import User from "../models/User";
import { userRequest } from "../interfaces/index";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["passwordHash"] },
      limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
      offset: req.query.offset ? parseInt(req.query.offset as string) : 0,
    });
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }

    res
      .status(200)
      .json({ message: "Users retrieved successfully", users: users });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["passwordHash"] },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User found successfully", user: user });
  } catch (error) {}
};
export const updateUser = async (req: userRequest, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    // if
    if (
      (req.user.role === "student" && req.user.id !== user.id) ||
      ["professor", "staff", "admin"].indexOf(req.user.role) === -1
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    if (req.body.username) {
      user.username = req.body.username;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.role && req.user.role === "admin") {
      user.role = req.body.role;
    }
    await user.save();
    res.status(200).json({ message: "User updated successfully", user: user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
