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
exports.getLecturesByCourseId = exports.deleteCourse = exports.updateCourse = exports.getCourseById = exports.getAllCourses = exports.createCourse = void 0;
const courseService_1 = require("../services/courseService");
const Course_1 = __importDefault(require("../models/Course"));
const User_1 = __importDefault(require("../models/User"));
const Department_1 = __importDefault(require("../models/Department"));
const courseService = new courseService_1.CourseService(Course_1.default);
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const department = yield Department_1.default.findByPk(req.body.departmentId);
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }
        const professor = yield User_1.default.findByPk(req.body.professorId);
        if (!professor) {
            return res.status(404).json({ message: "Professor not found" });
        }
        const course = yield courseService.createCourse(data);
        if (!course)
            return res.status(400).json({ message: "Course not created" });
        res.status(201).json({ message: "Course created successfully", course });
    }
    catch (error) {
        if (error.message) {
            return res.status(404).json({ message: error.message });
        }
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createCourse = createCourse;
const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield courseService.getAllCourses();
        res.status(200).json({ message: "All courses", courses });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllCourses = getAllCourses;
const getCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield courseService.getCourseById(req.params.id);
        if (!course)
            return res.status(404).json({ message: "Course not found" });
        res.status(200).json({ message: "Course found", course });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getCourseById = getCourseById;
const updateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCourse = yield courseService.updateCourse(req.params.id, req.body);
        if (!updatedCourse) {
            return res.status(400).json({ message: "Course not updated" });
        }
        res.status(200).json({ message: "Course updated", updatedCourse });
    }
    catch (error) {
        if (error.message) {
            return res.status(404).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateCourse = updateCourse;
const deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCourse = yield courseService.deleteCourse(req.params.id);
        res.status(200).json({ message: "Course deleted", deletedCourse });
    }
    catch (error) {
        if (error.message === "Course not found") {
            return res.status(404).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteCourse = deleteCourse;
const getLecturesByCourseId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.id;
        if (!courseId) {
            return res.status(400).json({ message: "Course ID is required" });
        }
        const courseLectures = yield courseService.getLecturesByCourseId(courseId);
        res
            .status(200)
            .json({ message: "Lectures found", lectures: courseLectures });
    }
    catch (error) {
        if (error.message === "Course not found") {
            return res.status(404).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getLecturesByCourseId = getLecturesByCourseId;
