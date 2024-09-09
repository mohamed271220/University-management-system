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
exports.getDepartmentYearTimetable = exports.getHallTimetable = exports.getDepartmentTimetable = exports.getProfessorTimetable = exports.getStudentTimetable = void 0;
const timetableService_1 = require("../services/timetableService");
const CustomError_1 = require("../utils/CustomError");
const redisClient_1 = __importDefault(require("../config/redisClient"));
const timetableService = new timetableService_1.TimetableService();
const getStudentTimetable = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, semesterId } = req.params;
        if (!studentId) {
            throw new CustomError_1.CustomError("Student ID is required", 400);
        }
        const timetable = yield timetableService.getStudentTimetable(studentId, semesterId);
        if (!timetable) {
            throw new CustomError_1.CustomError("Student timetable not found", 404);
        }
        yield redisClient_1.default.set(req.originalUrl, JSON.stringify(timetable), {
            EX: 3600, // Expire after 3600 seconds (1 hour)
        });
        res.status(200).json({ message: "Student timetable found", timetable });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getStudentTimetable = getStudentTimetable;
const getProfessorTimetable = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { professorId } = req.params;
        if (!professorId) {
            throw new CustomError_1.CustomError("Professor ID is required", 400);
        }
        const timetable = yield timetableService.getProfessorTimetable(professorId);
        if (!timetable) {
            throw new CustomError_1.CustomError("Professor timetable not found", 404);
        }
        yield redisClient_1.default.set(req.originalUrl, JSON.stringify(timetable), {
            EX: 3600, // Expire after 3600 seconds (1 hour)
        });
        res.status(200).json({ message: "Professor timetable found", timetable });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getProfessorTimetable = getProfessorTimetable;
const getDepartmentTimetable = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { departmentId } = req.params;
        if (!departmentId) {
            throw new CustomError_1.CustomError("Department ID is required", 400);
        }
        const timetable = yield timetableService.getDepartmentTimetable(departmentId);
        if (!timetable) {
            throw new CustomError_1.CustomError("Department timetable not found", 404);
        }
        yield redisClient_1.default.set(req.originalUrl, JSON.stringify(timetable), {
            EX: 3600, // Expire after 3600 seconds (1 hour)
        });
        res.status(200).json({ message: "Department timetable found", timetable });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getDepartmentTimetable = getDepartmentTimetable;
const getHallTimetable = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hallId } = req.params;
        if (!hallId) {
            throw new CustomError_1.CustomError("Hall ID is required", 400);
        }
        const timetable = yield timetableService.getHallTimetable(hallId);
        if (!timetable) {
            throw new CustomError_1.CustomError("Hall timetable not found", 404);
        }
        yield redisClient_1.default.set(req.originalUrl, JSON.stringify(timetable), {
            EX: 3600, // Expire after 3600 seconds (1 hour)
        });
        res.status(200).json({ message: "Hall timetable found", timetable });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getHallTimetable = getHallTimetable;
const getDepartmentYearTimetable = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departmentId = req.params.departmentId;
        const year = req.query.year;
        if (!departmentId || !year) {
            throw new CustomError_1.CustomError("Department ID and year are required", 400);
        }
        const timetable = yield timetableService.getDepartmentYearTimetable(departmentId, year);
        if (!timetable) {
            throw new CustomError_1.CustomError("Department year timetable not found", 404);
        }
        yield redisClient_1.default.set(req.originalUrl, JSON.stringify(timetable), {
            EX: 3600, // Expire after 3600 seconds (1 hour)
        });
        res
            .status(200)
            .json({ message: "Student year timetable found", timetable });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getDepartmentYearTimetable = getDepartmentYearTimetable;
