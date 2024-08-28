import { NextFunction, Request, Response } from "express";
import { ProfileService } from "../services/profileService";
import { userRequest } from "../interfaces";
import { CustomError } from "../utils/CustomError";

const profileService = new ProfileService();

export const getProfile = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);

    const profile = await profileService.getProfile(req.user.id);
    res.status(200).json({ message: "Profile found successfully", profile });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const createProfile = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);

    const profile = await profileService.createProfile(req.user.id, req.body);
    res.status(201).json({
      message: "Profile created successfully",
      profile,
    });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const updateProfile = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);

    const profile = await profileService.updateProfile(req.user.id, req.body);
    res.status(200).json({
      message: "Profile updated successfully",
      profile,
    });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};

export const deleteProfile = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);

    await profileService.deleteProfile(req.user.id);
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error: any) {
    console.error(error);
    next(error);
  }
};
