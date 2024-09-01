import express, { NextFunction, Request, Response } from "express";
import {
  generateRefreshToken,
  generateToken,
  verifyRefreshToken,
  verifyToken,
} from "../utils/jwt";
import User from "../models/User";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import { userRequest } from "../interfaces";
import { CustomError } from "../utils/CustomError";

export const getProfile = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    res.status(200).json({ userId: user!.id, role: user!.role });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      throw new CustomError("User already exists", 400);
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const id = uuid();
    const savedUser = await User.create({
      id,
      username,
      passwordHash,
      email,
      role: "Student",
    });

    const token = generateToken({ id: savedUser.id, role: savedUser.role });
    const refreshToken = generateRefreshToken({ id: savedUser.id });

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 604800000,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 604800000, // 1 week
    });

    res
      .status(201)
      .json({ message: "User created successfully", userId: savedUser.id });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, username } = req.body;
    if (!email && !username) {
      throw new CustomError("Invalid credentials", 400);
    }

    const whereClause: any = {};

    if (email) {
      whereClause.email = email;
    }

    if (username) {
      whereClause.username = username;
    }

    const user = await User.findOne({
      where: whereClause,
    });
    if (!user) throw new CustomError("Invalid credentials", 400);
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    );
    if (!isPasswordValid) throw new CustomError("Invalid credentials", 400);

    const token = generateToken({ id: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id });

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 604800000,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 604800000, // 1 week
    });

    res.status(200).json({ message: "Login successful", userId: user.id });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const validateSession = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    res.status(200).json({ userId: user!.id });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("refresh_token");
    res.clearCookie("auth_token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) throw new CustomError("Invalid token", 400);

    const user = verifyRefreshToken(refreshToken);
    if (!user) throw new CustomError("Invalid token", 400);

    const newAccessToken = generateToken({ id: user.id, role: user.role });
    const newRefreshToken = generateRefreshToken({
      id: user.id,
      role: user.role,
    });

    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 604800000,
    });

    res.cookie("auth_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 604800000,
    });

    return res.json({ message: "Token refreshed successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
