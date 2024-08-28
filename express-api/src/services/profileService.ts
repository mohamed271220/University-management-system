import Profile from "../models/Profile";
import User from "../models/User";
import { v4 as uuid } from "uuid";
import { InferAttributes } from "sequelize";
import { CustomError } from "../utils/CustomError";

export class ProfileService {
  async getProfile(userId: string) {
    const profile = await Profile.findOne({
      where: { userId },
      include: [{ model: User, attributes: { exclude: ["passwordHash"] } }],
    });
    if (!profile) throw new CustomError("Profile not found", 404);
    return profile;
  }

  async createProfile(userId: string, profileData: Partial<Profile>) {
    const existingProfile = await Profile.findOne({ where: { userId } });
    if (existingProfile) throw new CustomError("Profile already exists", 404);

    const { firstName, lastName, dob, contactNumber, address } = profileData;

    if (!firstName || !lastName || !dob || !contactNumber || !address) {
      throw new CustomError("Missing required profile data", 400);
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
  }

  async updateProfile(userId: string, updates: Partial<Profile>) {
    const existingProfile = await Profile.findOne({ where: { userId } });
    if (!existingProfile) throw new CustomError("Profile not found", 404);

    const { firstName, lastName, dob, contactNumber, address } = updates;

    if (firstName) existingProfile.firstName = firstName;
    if (lastName) existingProfile.lastName = lastName;
    if (dob) existingProfile.dob = dob;
    if (contactNumber) existingProfile.contactNumber = contactNumber;
    if (address) existingProfile.address = address;

    await existingProfile.save();
    return existingProfile;
  }

  async deleteProfile(userId: string) {
    const existingProfile = await Profile.findOne({ where: { userId } });
    if (!existingProfile) throw new CustomError("Profile not found", 404);

    await existingProfile.destroy();
  }
}
