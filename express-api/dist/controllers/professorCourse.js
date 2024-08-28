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
exports.deleteProfessorCourse = exports.getAllProfessorsByCourse = exports.getAllProfessorCourses = exports.getProfessorCourseById = exports.getAllCourses = exports.createProfessorCourse = void 0;
const professorCourseService_1 = require("../services/professorCourseService");
const ProfessorCourses_1 = __importDefault(require("../models/ProfessorCourses"));
const CustomError_1 = require("../utils/CustomError");
const professorCourseService = new professorCourseService_1.ProfessorCourseService(ProfessorCourses_1.default);
const createProfessorCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId, professorId } = req.params;
        if (!courseId || !professorId) {
            throw new CustomError_1.CustomError("Please provide all required fields", 400);
        }
        const professorCourse = yield professorCourseService.createProfessorCourse(courseId, professorId);
        res
            .status(201)
            .json({ message: "Professor course created", professorCourse });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.createProfessorCourse = createProfessorCourse;
const getAllCourses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield professorCourseService.getAllCourses();
        res.status(200).json({ message: "All courses", courses });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getAllCourses = getAllCourses;
const getProfessorCourseById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const professorCourse = yield professorCourseService.getProfessorCourseById(req.params.id);
        if (!professorCourse) {
            throw new CustomError_1.CustomError("Professor course not found", 404);
        }
        res
            .status(200)
            .json({ message: "Professor course found", professorCourse });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getProfessorCourseById = getProfessorCourseById;
const getAllProfessorCourses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const professorId = req.params.professorId;
        if (!professorId) {
            throw new CustomError_1.CustomError("Professor ID is required", 400);
        }
        const professorCourses = yield professorCourseService.getAllProfessorCourses(professorId);
        res
            .status(200)
            .json({ message: "All professor courses", professorCourses });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getAllProfessorCourses = getAllProfessorCourses;
const getAllProfessorsByCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.courseId;
        if (!courseId) {
            throw new CustomError_1.CustomError("Course ID is required", 400);
        }
        const courseProf = yield professorCourseService.getProfessorsByCourseId(courseId);
        res
            .status(200)
            .json({ message: "Professors found", professors: courseProf });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getAllProfessorsByCourse = getAllProfessorsByCourse;
const deleteProfessorCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId, professorId } = req.params;
        yield professorCourseService.deleteProfessorCourse(courseId, professorId);
        res.status(200).json({ message: "Professor course deleted successfully" });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.deleteProfessorCourse = deleteProfessorCourse;
