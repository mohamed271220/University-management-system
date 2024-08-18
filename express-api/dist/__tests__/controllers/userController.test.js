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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const user_1 = require("../../controllers/user");
const userService_1 = __importDefault(require("../../services/userService"));
const app = (0, express_1.default)();
app.get("/api/v1/users", user_1.getAllUsers);
describe("GET /api/v1/users", () => {
    let mockGetAllUsers;
    beforeEach(() => {
        mockGetAllUsers = jest.spyOn(userService_1.default.prototype, 'getAllUsers');
    });
    afterEach(() => {
        mockGetAllUsers.mockRestore();
    });
    it("should return 200 and a list of users", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUsers = [
            { id: "1", name: "User One" },
            { id: "2", name: "User Two" },
        ];
        mockGetAllUsers.mockResolvedValue(mockUsers);
        const res = yield (0, supertest_1.default)(app).get("/api/v1/users?limit=2&offset=0");
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Users retrieved successfully");
        expect(res.body.users).toEqual(mockUsers);
    }));
    it("should use default limit and offset if not provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUsers = [
            { id: "1", name: "User One" },
            { id: "2", name: "User Two" },
        ];
        mockGetAllUsers.mockResolvedValue(mockUsers);
        const res = yield (0, supertest_1.default)(app).get("/api/v1/users");
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Users retrieved successfully");
        expect(res.body.users).toEqual(mockUsers);
        expect(mockGetAllUsers).toHaveBeenCalledWith(10, 0);
    }));
    it("should return 500 if an error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
        mockGetAllUsers.mockRejectedValue(new Error("Internal server error"));
        const res = yield (0, supertest_1.default)(app).get("/api/v1/users");
        expect(res.status).toBe(500);
        expect(res.body.message).toBe("Internal server error");
    }));
});
