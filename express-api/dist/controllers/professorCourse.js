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
const professorCourse_1 = require("../services/professorCourse");
const ProfessorCourses_1 = __importDefault(require("../models/ProfessorCourses"));
const professorCourseService = new professorCourse_1.ProfessorCourseService(ProfessorCourses_1.default);
const createProfessorCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId, professorId } = req.params;
        if (!courseId || !professorId) {
            return res
                .status(400)
                .json({ message: "Course ID and Professor ID are required" });
        }
        const professorCourse = yield professorCourseService.createProfessorCourse(courseId, professorId);
        res
            .status(201)
            .json({ message: "Professor course created", professorCourse });
    }
    catch (error) {
        if (error.message === "Course not found") {
            console.log(error);
            return res.status(404).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createProfessorCourse = createProfessorCourse;
const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield professorCourseService.getAllCourses();
        res.status(200).json({ message: "All courses", courses });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllCourses = getAllCourses;
const getProfessorCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const professorCourse = yield professorCourseService.getProfessorCourseById(req.params.id);
        if (!professorCourse) {
            return res.status(404).json({ message: "Professor course not found" });
        }
        res
            .status(200)
            .json({ message: "Professor course found", professorCourse });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getProfessorCourseById = getProfessorCourseById;
const getAllProfessorCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const professorId = req.params.professorId;
        if (!professorId) {
            return res.status(400).json({ message: "Professor ID is required" });
        }
        const professorCourses = yield professorCourseService.getAllProfessorCourses(professorId);
        res
            .status(200)
            .json({ message: "All professor courses", professorCourses });
    }
    catch (error) {
        if (error.message === "Professor not found") {
            console.log(error);
            return res.status(404).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllProfessorCourses = getAllProfessorCourses;
const getAllProfessorsByCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.courseId;
        if (!courseId) {
            return res.status(400).json({ message: "Course ID is required" });
        }
        const courseProf = yield professorCourseService.getProfessorsByCourseId(courseId);
        res
            .status(200)
            .json({ message: "Professors found", professors: courseProf });
    }
    catch (error) {
        if (error.message === "Course not found") {
            console.log(error);
            return res.status(404).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllProfessorsByCourse = getAllProfessorsByCourse;
const deleteProfessorCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId, professorId } = req.params;
        yield professorCourseService.deleteProfessorCourse(courseId, professorId);
        res.status(200).json({ message: "Professor course deleted successfully" });
    }
    catch (error) {
        if (error.message === "Professor course not found") {
            console.log(error);
            return res.status(404).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteProfessorCourse = deleteProfessorCourse;
