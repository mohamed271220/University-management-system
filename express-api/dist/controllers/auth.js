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
exports.refreshToken = exports.logout = exports.validateSession = exports.login = exports.signup = void 0;
const jwt_1 = require("../utils/jwt");
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const CustomError_1 = require("../utils/CustomError");
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email } = req.body;
        const user = yield User_1.default.findOne({ where: { email } });
        if (user) {
            throw new CustomError_1.CustomError("User already exists", 400);
        }
        const passwordHash = yield bcrypt_1.default.hash(password, 12);
        const id = (0, uuid_1.v4)();
        const savedUser = yield User_1.default.create({
            id,
            username,
            passwordHash,
            email,
            role: "Student",
        });
        const token = (0, jwt_1.generateToken)({ id: savedUser.id, role: savedUser.role });
        const refreshToken = (0, jwt_1.generateRefreshToken)({ id: savedUser.id });
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 604800000,
        });
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 604800000, // 1 week
        });
        res
            .status(201)
            .json({ message: "User created successfully", userId: savedUser.id });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username } = req.body;
        if (!email && !username) {
            throw new CustomError_1.CustomError("Invalid credentials", 400);
        }
        const whereClause = {};
        if (email) {
            whereClause.email = email;
        }
        if (username) {
            whereClause.username = username;
        }
        const user = yield User_1.default.findOne({
            where: whereClause,
        });
        if (!user)
            throw new CustomError_1.CustomError("Invalid credentials", 400);
        const isPasswordValid = yield bcrypt_1.default.compare(req.body.password, user.passwordHash);
        if (!isPasswordValid)
            throw new CustomError_1.CustomError("Invalid credentials", 400);
        const token = (0, jwt_1.generateToken)({ id: user.id, role: user.role });
        const refreshToken = (0, jwt_1.generateRefreshToken)({ id: user.id });
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 604800000,
        });
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 604800000, // 1 week
        });
        res.status(200).json({ message: "Login successful", userId: user.id });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.login = login;
const validateSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        res.status(200).json({ userId: user.id });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.validateSession = validateSession;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("refresh_token");
        res.clearCookie("auth_token");
        res.status(200).json({ message: "Logout successful" });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.logout = logout;
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken)
            throw new CustomError_1.CustomError("Invalid token", 400);
        const user = (0, jwt_1.verifyRefreshToken)(refreshToken);
        if (!user)
            throw new CustomError_1.CustomError("Invalid token", 400);
        const newAccessToken = (0, jwt_1.generateToken)({ id: user.id, role: user.role });
        const newRefreshToken = (0, jwt_1.generateRefreshToken)({
            id: user.id,
            role: user.role,
        });
        res.cookie("refresh_token", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 604800000,
        });
        res.cookie("auth_token", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 604800000,
        });
        return res.json({ message: "Token refreshed successfully" });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.refreshToken = refreshToken;
