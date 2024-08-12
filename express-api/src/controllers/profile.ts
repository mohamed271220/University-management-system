import { Request, Response } from "express";
import User from "../models/User";
import Profile from "../models/Profile";
import { userRequest } from "../interfaces";
import { InferAttributes } from "sequelize";
import { v4 as uuid } from "uuid";

export const getProfile = async (req: userRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const profile = await Profile.findOne({
      where: { userId: req.user.id },
      include: [{ model: User, attributes: { exclude: ["passwordHash"] } }], // Include the user model to get the user details
    });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res
      .status(200)
      .json({ message: "Profile found successfully", profile: profile });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const createProfile = async (req: userRequest, res: Response) => {
  try {
    // only authenticated users can create their own profile
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    // check if the user already has a profile
    const existingProfile = await Profile.findOne({
      where: { userId: req.user.id },
    });
    if (existingProfile)
      return res.status(400).json({ message: "Profile already exists" });
    const { firstName, lastName, dob, contactNumber, address } = req.body;
    // TODO : replace with express validator
    if (!firstName || !lastName || !dob || !contactNumber || !address) {
      return res.status(400).json({ message: "Missing required profile data" });
    }
    const profile = await Profile.create({
      id: uuid(),
      firstName,
      lastName,
      dob,
      contactNumber,
      address,
      userId: req.user.id,
    } as InferAttributes<Profile>);
    res.status(201).json({
      message: "Profile created successfully",
      profile: profile,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateProfile = async (req: userRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const existingProfile = await Profile.findOne({
      where: { userId: req.user.id },
    });
    if (!existingProfile)
      return res.status(404).json({ message: "Profile not found" });
    const { firstName, lastName, dob, contactNumber, address } = req.body;
    if (firstName) existingProfile.firstName = firstName;
    if (lastName) existingProfile.lastName = lastName;
    if (dob) existingProfile.dob = dob;
    if (contactNumber) existingProfile.contactNumber = contactNumber;
    if (address) existingProfile.address = address;
    await existingProfile.save();
    res.status(200).json({
      message: "Profile updated successfully",
      profile: existingProfile,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteProfile = async (req: userRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const existingProfile = await Profile.findOne({
      where: { userId: req.user.id },
    });
    if (!existingProfile)
      return res.status(404).json({ message: "Profile not found" });
    await existingProfile.destroy();
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
