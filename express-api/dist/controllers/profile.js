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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfile = exports.updateProfile = exports.createProfile = exports.getProfile = void 0;
const profileService_1 = require("../services/profileService");
const CustomError_1 = require("../utils/CustomError");
const profileService = new profileService_1.ProfileService();
const getProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user)
            throw new CustomError_1.CustomError("Unauthorized", 401);
        const profile = yield profileService.getProfile(req.user.id);
        res.status(200).json({ message: "Profile found successfully", profile });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getProfile = getProfile;
const createProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user)
            throw new CustomError_1.CustomError("Unauthorized", 401);
        const profile = yield profileService.createProfile(req.user.id, req.body);
        res.status(201).json({
            message: "Profile created successfully",
            profile,
        });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.createProfile = createProfile;
const updateProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user)
            throw new CustomError_1.CustomError("Unauthorized", 401);
        const profile = yield profileService.updateProfile(req.user.id, req.body);
        res.status(200).json({
            message: "Profile updated successfully",
            profile,
        });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.updateProfile = updateProfile;
const deleteProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user)
            throw new CustomError_1.CustomError("Unauthorized", 401);
        yield profileService.deleteProfile(req.user.id);
        res.status(200).json({ message: "Profile deleted successfully" });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.deleteProfile = deleteProfile;
