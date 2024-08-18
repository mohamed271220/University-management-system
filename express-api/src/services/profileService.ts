import Profile from "../models/Profile";
import User from "../models/User";
import { v4 as uuid } from "uuid";
import { InferAttributes } from "sequelize";

export class ProfileService {
  async getProfile(userId: string) {
    try {
      const profile = await Profile.findOne({
        where: { userId },
        include: [{ model: User, attributes: { exclude: ["passwordHash"] } }],
      });
      if (!profile) throw new Error("Profile not found");
      return profile;
    } catch (error: any) {
      throw new Error(error.message || "Internal server error");
    }
  }

  async createProfile(userId: string, profileData: Partial<Profile>) {
    try {
      const existingProfile = await Profile.findOne({ where: { userId } });
      if (existingProfile) throw new Error("Profile already exists");

      const { firstName, lastName, dob, contactNumber, address } = profileData;

      if (!firstName || !lastName || !dob || !contactNumber || !address) {
        throw new Error("Missing required profile data");
      }

      const profile = await Profile.create({
        id: uuid(),
        firstName,
        lastName,
        dob,
        contactNumber,
        address,
        userId,
      } as InferAttributes<Profile>);

      return profile;
    } catch (error: any) {
      throw new Error(error.message || "Internal server error");
    }
  }

  async updateProfile(userId: string, updates: Partial<Profile>) {
    try {
      const existingProfile = await Profile.findOne({ where: { userId } });
      if (!existingProfile) throw new Error("Profile not found");

      const { firstName, lastName, dob, contactNumber, address } = updates;

      if (firstName) existingProfile.firstName = firstName;
      if (lastName) existingProfile.lastName = lastName;
      if (dob) existingProfile.dob = dob;
      if (contactNumber) existingProfile.contactNumber = contactNumber;
      if (address) existingProfile.address = address;

      await existingProfile.save();
      return existingProfile;
    } catch (error: any) {
      throw new Error(error.message || "Internal server error");
    }
  }

  async deleteProfile(userId: string) {
    try {
      const existingProfile = await Profile.findOne({ where: { userId } });
      if (!existingProfile) throw new Error("Profile not found");

      await existingProfile.destroy();
    } catch (error: any) {
      throw new Error(error.message || "Internal server error");
    }
  }
}
