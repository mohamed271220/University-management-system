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
const profile_1 = require("../../controllers/profile");
const profileService_1 = require("../../services/profileService");
jest.mock("../../services/profileService");
describe("getProfile", () => {
    let req, res, next;
    beforeEach(() => {
        req = { user: { id: "1" } };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });
    it("should return the profile if found", () => __awaiter(void 0, void 0, void 0, function* () {
        const profile = { id: "1", firstName: "First", lastName: "Last" };
        profileService_1.ProfileService.prototype.getProfile.mockResolvedValue(profile);
        yield (0, profile_1.getProfile)(req, res);
        expect(profileService_1.ProfileService.prototype.getProfile).toHaveBeenCalledWith("1");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Profile found successfully",
            profile,
        });
    }));
    it("should return a 404 status if profile not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Profile not found";
        profileService_1.ProfileService.prototype.getProfile.mockRejectedValue(new Error(errorMessage));
        yield (0, profile_1.getProfile)(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    }));
    it("should return a 500 status if an error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Internal server error";
        profileService_1.ProfileService.prototype.getProfile.mockRejectedValue(new Error(errorMessage));
        yield (0, profile_1.getProfile)(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    }));
});
describe("createProfile", () => {
    let req, res, next;
    beforeEach(() => {
        req = { user: { id: "1" } };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });
    it("should create and return the profile", () => __awaiter(void 0, void 0, void 0, function* () {
        const profile = { id: "1", firstName: "First", lastName: "Last" };
        profileService_1.ProfileService.prototype.createProfile.mockResolvedValue(profile);
        yield (0, profile_1.createProfile)(req, res);
        expect(profileService_1.ProfileService.prototype.createProfile).toHaveBeenCalledWith("1", req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: "Profile created successfully",
            profile,
        });
    }));
    it("should return a 400 status if profile already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Profile already exists";
        profileService_1.ProfileService.prototype.createProfile.mockRejectedValue(new Error(errorMessage));
        yield (0, profile_1.createProfile)(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    }));
    it("should return a 400 status if missing required profile data", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Missing required profile data";
        profileService_1.ProfileService.prototype.createProfile.mockRejectedValue(new Error(errorMessage));
        yield (0, profile_1.createProfile)(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    }));
    it("should return a 500 status if an error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Internal server error";
        profileService_1.ProfileService.prototype.createProfile.mockRejectedValue(new Error(errorMessage));
        yield (0, profile_1.createProfile)(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    }));
});
describe("updateProfile", () => {
    let req, res, next;
    beforeEach(() => {
        req = { user: { id: "1" } };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });
    it("should update and return the profile", () => __awaiter(void 0, void 0, void 0, function* () {
        const profile = { id: "1", firstName: "First", lastName: "Last" };
        profileService_1.ProfileService.prototype.updateProfile.mockResolvedValue(profile);
        yield (0, profile_1.updateProfile)(req, res);
        expect(profileService_1.ProfileService.prototype.updateProfile).toHaveBeenCalledWith("1", req.body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Profile updated successfully",
            profile,
        });
    }));
    it("should return a 500 status if an error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Internal server error";
        profileService_1.ProfileService.prototype.updateProfile.mockRejectedValue(new Error(errorMessage));
        yield (0, profile_1.updateProfile)(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    }));
});
describe("deleteProfile", () => {
    let req, res, next;
    beforeEach(() => {
        req = { user: { id: "1" } };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });
    it("should delete the profile", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, profile_1.deleteProfile)(req, res);
        expect(profileService_1.ProfileService.prototype.deleteProfile).toHaveBeenCalledWith("1");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Profile deleted successfully",
        });
    }));
    it("should return a 401 status if unauthorized", () => __awaiter(void 0, void 0, void 0, function* () {
        req = { user: undefined };
        yield (0, profile_1.deleteProfile)(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
    }));
    it("should return a 500 status if an error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Internal server error";
        profileService_1.ProfileService.prototype.deleteProfile.mockRejectedValue(new Error(errorMessage));
        yield (0, profile_1.deleteProfile)(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    }));
});
