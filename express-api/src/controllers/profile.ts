import { Request, Response } from "express";
import { ProfileService } from "../services/profileService";
import { userRequest } from "../interfaces";

const profileService = new ProfileService();

export const getProfile = async (req: userRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const profile = await profileService.getProfile(req.user.id);
    res.status(200).json({ message: "Profile found successfully", profile });
  } catch (error: any) {
    if (error.message === "Profile not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const createProfile = async (req: userRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const profile = await profileService.createProfile(req.user.id, req.body);
    res.status(201).json({
      message: "Profile created successfully",
      profile,
    });
  } catch (error: any) {
    if (error.message === "Profile already exists") {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === "Missing required profile data") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req: userRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const profile = await profileService.updateProfile(req.user.id, req.body);
    res.status(200).json({
      message: "Profile updated successfully",
      profile,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProfile = async (req: userRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    await profileService.deleteProfile(req.user.id);
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
