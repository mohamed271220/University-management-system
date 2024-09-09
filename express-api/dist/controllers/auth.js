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
exports.changePassword = exports.resetPassword = exports.forgotPassword = exports.refreshToken = exports.logout = exports.validateSession = exports.login = exports.signup = exports.getProfile = void 0;
const jwt_1 = require("../utils/jwt");
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const CustomError_1 = require("../utils/CustomError");
const crypto_1 = __importDefault(require("crypto"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const sequelize_1 = require("sequelize");
const getProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        res.status(200).json({ userId: user.id, role: user.role });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getProfile = getProfile;
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email } = req.body;
        const user = yield User_1.default.findOne({ where: { email } });
        if (user) {
            throw new CustomError_1.CustomError("User already exists", 400);
        }
        const passwordHash = yield bcryptjs_1.default.hash(password, 12);
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
        const isPasswordValid = yield bcryptjs_1.default.compare(req.body.password, user.passwordHash);
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
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    {
        const { email } = req.body;
        try {
            const user = yield User_1.default.findOne({ where: { email } });
            if (!user) {
                throw new CustomError_1.CustomError("User not found", 404);
            }
            const token = crypto_1.default.randomBytes(32).toString("hex");
            const tokenExpiration = Date.now() + 3600000; // 1 hour from now
            user.resetPasswordToken = token;
            user.resetPasswordExpires = new Date(tokenExpiration);
            yield user.save();
            const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
            const transporter = nodemailer_1.default.createTransport({
                service: "Gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });
            const mailOptions = {
                to: user.email,
                from: "password-reset@your-app.com",
                subject: "Password Reset",
                text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${resetLink}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
            };
            yield transporter.sendMail(mailOptions);
            res.status(200).send("Password reset email sent");
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const user = yield User_1.default.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: { [sequelize_1.Op.gt]: Date.now() }, // Token is still valid
            },
        });
        if (!user) {
            throw new CustomError_1.CustomError("Invalid or expired token", 400);
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        user.passwordHash = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        yield user.save();
        res.status(200).send("Password has been reset");
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.resetPassword = resetPassword;
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { currentPassword, newPassword } = req.body;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const user = yield User_1.default.findByPk(id); // Assuming user is authenticated
        if (!user) {
            throw new CustomError_1.CustomError("User not found", 404);
        }
        const isMatch = yield bcryptjs_1.default.compare(currentPassword, user.passwordHash);
        if (!isMatch) {
            throw new CustomError_1.CustomError("Invalid password", 400);
        }
        const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
        user.passwordHash = hashedPassword;
        yield user.save();
        res.status(200).send("Password has been changed");
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.changePassword = changePassword;
