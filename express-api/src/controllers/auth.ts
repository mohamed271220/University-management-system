import express, { NextFunction, Request, Response } from "express";
import {
  generateRefreshToken,
  generateToken,
  verifyRefreshToken,
  verifyToken,
} from "../utils/jwt";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import { userRequest } from "../interfaces";
import { CustomError } from "../utils/CustomError";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { Op } from "sequelize";

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

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  {
    const { email } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new CustomError("User not found", 404);
      }

      const token = crypto.randomBytes(32).toString("hex");
      const tokenExpiration = Date.now() + 3600000; // 1 hour from now

      user.resetPasswordToken = token;
      user.resetPasswordExpires = new Date(tokenExpiration);
      await user.save();

      const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        to: user.email,
        from: "password-reset@your-app.com",
        subject: "Password Reset",
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${resetLink}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).send("Password reset email sent");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: Date.now() }, // Token is still valid
      },
    });

    if (!user) {
      throw new CustomError("Invalid or expired token", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.passwordHash = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).send("Password has been reset");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const changePassword = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  const { currentPassword, newPassword } = req.body;
  const id = req.user?.id;
  try {
    const user = await User.findByPk(id); // Assuming user is authenticated

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      throw new CustomError("Invalid password", 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.passwordHash = hashedPassword;
    await user.save();

    res.status(200).send("Password has been changed");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
