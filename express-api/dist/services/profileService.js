"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const Profile_1 = __importDefault(require("../models/Profile"));
const User_1 = __importDefault(require("../models/User"));
const uuid_1 = require("uuid");
const CustomError_1 = require("../utils/CustomError");
class ProfileService {
    getProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield Profile_1.default.findOne({
                where: { userId },
                include: [{ model: User_1.default, attributes: { exclude: ["passwordHash"] } }],
            });
            if (!profile)
                throw new CustomError_1.CustomError("Profile not found", 404);
            return profile;
        });
    }
    createProfile(userId, profileData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingProfile = yield Profile_1.default.findOne({ where: { userId } });
            if (existingProfile)
                throw new CustomError_1.CustomError("Profile already exists", 404);
            const { firstName, lastName, dob, contactNumber, address } = profileData;
            if (!firstName || !lastName || !dob || !contactNumber || !address) {
                throw new CustomError_1.CustomError("Missing required profile data", 400);
            }
            const profile = yield Profile_1.default.create({
                id: (0, uuid_1.v4)(),
                firstName,
                lastName,
                dob,
                contactNumber,
                address,
                userId,
            });
            return profile;
        });
    }
    updateProfile(userId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingProfile = yield Profile_1.default.findOne({ where: { userId } });
            if (!existingProfile)
                throw new CustomError_1.CustomError("Profile not found", 404);
            const { firstName, lastName, dob, contactNumber, address } = updates;
            if (firstName)
                existingProfile.firstName = firstName;
            if (lastName)
                existingProfile.lastName = lastName;
            if (dob)
                existingProfile.dob = dob;
            if (contactNumber)
                existingProfile.contactNumber = contactNumber;
            if (address)
                existingProfile.address = address;
            yield existingProfile.save();
            return existingProfile;
        });
    }
    deleteProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingProfile = yield Profile_1.default.findOne({ where: { userId } });
            if (!existingProfile)
                throw new CustomError_1.CustomError("Profile not found", 404);
            yield existingProfile.destroy();
        });
    }
}
exports.ProfileService = ProfileService;
