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
exports.deleteStudentCourse = exports.updateStudentCourse = exports.getStudentCourseById = exports.getAllStudentsByCourse = exports.getAllCoursesByStudentId = exports.enrollCourses = void 0;
const studentCourseService_1 = require("../services/studentCourseService");
const StudentCourses_1 = __importDefault(require("../models/StudentCourses"));
const CustomError_1 = require("../utils/CustomError");
const studentCourseService = new studentCourseService_1.StudentCourseService(StudentCourses_1.default);
const enrollCourses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { studentId } = req.params;
        const { courses, semesterId } = req.body;
        if (studentId !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) && ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) !== "student") {
            throw new CustomError_1.CustomError("Unauthorized", 401);
        }
        if (!studentId || !courses || !semesterId) {
            throw new CustomError_1.CustomError("Please provide all required fields", 400);
        }
        const studentCourses = yield studentCourseService.enrollCourses(studentId, courses, semesterId);
        res.status(201).json({ message: "Courses enrolled", studentCourses });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.enrollCourses = enrollCourses;
const getAllCoursesByStudentId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.params.studentId;
        if (!studentId) {
            throw new CustomError_1.CustomError("Student ID is required", 400);
        }
        const studentCourses = yield studentCourseService.getStudentCoursesByStudentId(studentId);
        res.status(200).json({ message: "Courses found", courses: studentCourses });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getAllCoursesByStudentId = getAllCoursesByStudentId;
const getAllStudentsByCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.courseId;
        if (!courseId) {
            throw new CustomError_1.CustomError("Course ID is required", 400);
        }
        const courseStudents = yield studentCourseService.getStudentsByCourseId(courseId);
        res
            .status(200)
            .json({ message: "Students found", students: courseStudents });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getAllStudentsByCourse = getAllStudentsByCourse;
const getStudentCourseById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, courseId } = req.params;
        if (!studentId || !courseId) {
            throw new CustomError_1.CustomError("Student ID and Course ID are required", 400);
        }
        const studentCourse = yield studentCourseService.getStudentCourseById(studentId, courseId);
        if (!studentCourse) {
            throw new CustomError_1.CustomError("Student course not found", 404);
        }
        res.status(200).json({ message: "Student course found", studentCourse });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getStudentCourseById = getStudentCourseById;
const updateStudentCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, courseId } = req.params;
        const { semesterId } = req.body;
        if (!studentId || !courseId || !semesterId) {
            throw new CustomError_1.CustomError("Student ID, Course ID, and Semester ID are required", 400);
        }
        const studentCourse = yield studentCourseService.updateStudentCourse(studentId, courseId, semesterId);
        res
            .status(200)
            .json({ message: "Student enrollment updated", studentCourse });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.updateStudentCourse = updateStudentCourse;
const deleteStudentCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, courseId } = req.params;
        if (!studentId || !courseId) {
            throw new CustomError_1.CustomError("Student ID and Course ID are required", 400);
        }
        yield studentCourseService.deleteStudentCourse(studentId, courseId);
        res.status(204).end();
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.deleteStudentCourse = deleteStudentCourse;
