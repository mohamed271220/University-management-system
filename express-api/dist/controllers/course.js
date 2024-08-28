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
const CustomError_1 = require("../utils/CustomError");
const courseService = new courseService_1.CourseService(Course_1.default);
const createCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const department = yield Department_1.default.findByPk(req.body.departmentId);
        if (!department) {
            throw new CustomError_1.CustomError("Department not found", 404);
        }
        const professor = yield User_1.default.findByPk(req.body.professorId);
        if (!professor) {
            throw new CustomError_1.CustomError("Professor not found", 404);
        }
        const course = yield courseService.createCourse(data);
        if (!course)
            throw new CustomError_1.CustomError("Failed to create course", 500);
        res.status(201).json({ message: "Course created successfully", course });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.createCourse = createCourse;
const getAllCourses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield courseService.getAllCourses();
        res.status(200).json({ message: "All courses", courses });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getAllCourses = getAllCourses;
const getCourseById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield courseService.getCourseById(req.params.id);
        if (!course)
            return res.status(404).json({ message: "Course not found" });
        res.status(200).json({ message: "Course found", course });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getCourseById = getCourseById;
const updateCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCourse = yield courseService.updateCourse(req.params.id, req.body);
        if (!updatedCourse) {
            throw new CustomError_1.CustomError("Course not found", 404);
        }
        res.status(200).json({ message: "Course updated", updatedCourse });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.updateCourse = updateCourse;
const deleteCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCourse = yield courseService.deleteCourse(req.params.id);
        res.status(200).json({ message: "Course deleted", deletedCourse });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.deleteCourse = deleteCourse;
const getLecturesByCourseId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.id;
        if (!courseId) {
            throw new CustomError_1.CustomError("Course ID is required", 400);
        }
        const courseLectures = yield courseService.getLecturesByCourseId(courseId);
        res
            .status(200)
            .json({ message: "Lectures found", lectures: courseLectures });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getLecturesByCourseId = getLecturesByCourseId;
