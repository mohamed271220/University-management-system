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
const studentCourseService = new studentCourseService_1.StudentCourseService(StudentCourses_1.default);
const enrollCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { studentId } = req.params;
        const { courses, semesterId } = req.body;
        if (studentId !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
            return res.status(403).json({ message: "Forbidden" });
        }
        if (!studentId || !courses || !semesterId) {
            return res
                .status(400)
                .json({ message: "Student ID and courses are required" });
        }
        const studentCourses = yield studentCourseService.enrollCourses(studentId, courses, semesterId);
        res.status(201).json({ message: "Courses enrolled", studentCourses });
    }
    catch (error) {
        if (error.message === "Student not found") {
            return res.status(404).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.enrollCourses = enrollCourses;
const getAllCoursesByStudentId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.params.studentId;
        if (!studentId) {
            return res.status(400).json({ message: "Student ID is required" });
        }
        const studentCourses = yield studentCourseService.getStudentCoursesByStudentId(studentId);
        res.status(200).json({ message: "Courses found", courses: studentCourses });
    }
    catch (error) {
        if (error.message === "Student not found") {
            return res.status(404).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllCoursesByStudentId = getAllCoursesByStudentId;
const getAllStudentsByCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.courseId;
        if (!courseId) {
            return res.status(400).json({ message: "Course ID is required" });
        }
        const courseStudents = yield studentCourseService.getStudentsByCourseId(courseId);
        res
            .status(200)
            .json({ message: "Students found", students: courseStudents });
    }
    catch (error) {
        if (error.message === "Course not found") {
            return res.status(404).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllStudentsByCourse = getAllStudentsByCourse;
const getStudentCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, courseId } = req.params;
        if (!studentId || !courseId) {
            return res
                .status(400)
                .json({ message: "Student ID and Course ID are required" });
        }
        const studentCourse = yield studentCourseService.getStudentCourseById(studentId, courseId);
        if (!studentCourse) {
            return res.status(404).json({ message: "Student course not found" });
        }
        res.status(200).json({ message: "Student course found", studentCourse });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getStudentCourseById = getStudentCourseById;
const updateStudentCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, courseId } = req.params;
        const { semesterId } = req.body;
        if (!studentId || !courseId || !semesterId) {
            return res.status(400).json({
                message: "Student ID, Course ID, and Semester ID are required",
            });
        }
        const studentCourse = yield studentCourseService.updateStudentCourse(studentId, courseId, semesterId);
        res.status(200).json({ message: "Student course updated", studentCourse });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateStudentCourse = updateStudentCourse;
const deleteStudentCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, courseId } = req.params;
        if (!studentId || !courseId) {
            return res
                .status(400)
                .json({ message: "Student ID and Course ID are required" });
        }
        yield studentCourseService.deleteStudentCourse(studentId, courseId);
        res.status(204).end();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteStudentCourse = deleteStudentCourse;
