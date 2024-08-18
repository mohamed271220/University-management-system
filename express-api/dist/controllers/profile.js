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
const profileService = new profileService_1.ProfileService();
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user)
            return res.status(401).json({ message: "Unauthorized" });
        const profile = yield profileService.getProfile(req.user.id);
        res.status(200).json({ message: "Profile found successfully", profile });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getProfile = getProfile;
const createProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user)
            return res.status(401).json({ message: "Unauthorized" });
        const profile = yield profileService.createProfile(req.user.id, req.body);
        res.status(201).json({
            message: "Profile created successfully",
            profile,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createProfile = createProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user)
            return res.status(401).json({ message: "Unauthorized" });
        const profile = yield profileService.updateProfile(req.user.id, req.body);
        res.status(200).json({
            message: "Profile updated successfully",
            profile,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateProfile = updateProfile;
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user)
            return res.status(401).json({ message: "Unauthorized" });
        yield profileService.deleteProfile(req.user.id);
        res.status(200).json({ message: "Profile deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteProfile = deleteProfile;
