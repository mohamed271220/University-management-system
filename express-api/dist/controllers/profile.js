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
exports.deleteProfile = exports.updateProfile = exports.createProfile = exports.getProfile = void 0;
const User_1 = __importDefault(require("../models/User"));
const Profile_1 = __importDefault(require("../models/Profile"));
const uuid_1 = require("uuid");
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user)
            return res.status(401).json({ message: "Unauthorized" });
        const profile = yield Profile_1.default.findOne({
            where: { userId: req.user.id },
            include: [{ model: User_1.default, attributes: { exclude: ["passwordHash"] } }], // Include the user model to get the user details
        });
        if (!profile)
            return res.status(404).json({ message: "Profile not found" });
        res
            .status(200)
            .json({ message: "Profile found successfully", profile: profile });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getProfile = getProfile;
const createProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // only authenticated users can create their own profile
        if (!req.user)
            return res.status(401).json({ message: "Unauthorized" });
        // check if the user already has a profile
        const existingProfile = yield Profile_1.default.findOne({
            where: { userId: req.user.id },
        });
        if (existingProfile)
            return res.status(400).json({ message: "Profile already exists" });
        const { firstName, lastName, dob, contactNumber, address } = req.body;
        // TODO : replace with express validator
        if (!firstName || !lastName || !dob || !contactNumber || !address) {
            return res.status(400).json({ message: "Missing required profile data" });
        }
        const profile = yield Profile_1.default.create({
            id: (0, uuid_1.v4)(),
            firstName,
            lastName,
            dob,
            contactNumber,
            address,
            userId: req.user.id,
        });
        res.status(201).json({
            message: "Profile created successfully",
            profile: profile,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createProfile = createProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user)
            return res.status(401).json({ message: "Unauthorized" });
        const existingProfile = yield Profile_1.default.findOne({
            where: { userId: req.user.id },
        });
        if (!existingProfile)
            return res.status(404).json({ message: "Profile not found" });
        const { firstName, lastName, dob, contactNumber, address } = req.body;
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
        res.status(200).json({
            message: "Profile updated successfully",
            profile: existingProfile,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateProfile = updateProfile;
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user)
            return res.status(401).json({ message: "Unauthorized" });
        const existingProfile = yield Profile_1.default.findOne({
            where: { userId: req.user.id },
        });
        if (!existingProfile)
            return res.status(404).json({ message: "Profile not found" });
        yield existingProfile.destroy();
        res.status(200).json({ message: "Profile deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteProfile = deleteProfile;
