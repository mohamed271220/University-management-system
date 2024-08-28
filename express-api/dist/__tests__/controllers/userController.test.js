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
const user_1 = require("../../controllers/user");
const userService_1 = __importDefault(require("../../services/userService"));
const user_2 = require("../../controllers/user");
const user_3 = require("../../controllers/user");
jest.mock("../../services/userService");
describe("getUserById", () => {
    let req, res, next;
    beforeEach(() => {
        req = { params: { id: "1" } };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });
    it("should return the user if found", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = { id: "1", username: "User1" };
        userService_1.default.prototype.getUserById.mockResolvedValue(user);
        yield (0, user_1.getUserById)(req, res, next);
        expect(userService_1.default.prototype.getUserById).toHaveBeenCalledWith("1");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "User found successfully",
            user,
        });
    }));
    it("should return a 404 status if user not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "User not found";
        userService_1.default.prototype.getUserById.mockRejectedValue(new Error(errorMessage));
        yield (0, user_1.getUserById)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    }));
});
jest.mock("../../services/userService");
describe("getUserById", () => {
    let req, res, next;
    beforeEach(() => {
        req = { params: { id: "1" } };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });
    it("should return the user if found", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = { id: "1", username: "User1" };
        userService_1.default.prototype.getUserById.mockResolvedValue(user);
        yield (0, user_1.getUserById)(req, res, next);
        expect(userService_1.default.prototype.getUserById).toHaveBeenCalledWith("1");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "User found successfully",
            user,
        });
    }));
    it("should return a 404 status if user not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "User not found";
        userService_1.default.prototype.getUserById.mockRejectedValue(new Error(errorMessage));
        yield (0, user_1.getUserById)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    }));
});
jest.mock("../../services/userService");
describe("updateUser", () => {
    let req, res, next;
    beforeEach(() => {
        req = {
            params: { id: "1" },
            body: { username: "UpdatedUser" },
            user: { id: "1", role: "student" },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });
    it("should update and return the updated user", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedUser = { id: "1", username: "UpdatedUser" };
        userService_1.default.prototype.updateUser.mockResolvedValue(updatedUser);
        yield (0, user_3.updateUser)(req, res, next);
        expect(userService_1.default.prototype.updateUser).toHaveBeenCalledWith("1", req.body, req);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "User updated successfully",
            user: updatedUser,
        });
    }));
    it("should return a 500 status on error", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Internal server error";
        userService_1.default.prototype.updateUser.mockRejectedValue(new Error(errorMessage));
        yield (0, user_3.updateUser)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    }));
});
jest.mock("../../services/userService");
describe("deleteUser", () => {
    let req, res, next;
    beforeEach(() => {
        req = { params: { id: "1" } };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });
    it("should delete the user and return a success message", () => __awaiter(void 0, void 0, void 0, function* () {
        userService_1.default.prototype.deleteUser.mockResolvedValue(undefined);
        yield (0, user_2.deleteUser)(req, res, next);
        expect(userService_1.default.prototype.deleteUser).toHaveBeenCalledWith("1");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "User deleted successfully",
        });
    }));
    it("should return a 500 status on error", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = "Internal server error";
        userService_1.default.prototype.deleteUser.mockRejectedValue(new Error(errorMessage));
        yield (0, user_2.deleteUser)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    }));
});
