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
exports.getStudentEnrolledCourses = exports.getSemesterGrades = exports.deleteSemester = exports.updateSemester = exports.getSemesterById = exports.getAllSemesters = exports.createSemester = void 0;
const semesterService_1 = require("../services/semesterService");
const Semester_1 = __importDefault(require("../models/Semester"));
const semesterService = new semesterService_1.SemesterService(Semester_1.default);
const createSemester = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, startDate, endDate } = req.body;
        const semester = yield semesterService.createSemester(name, startDate, endDate);
        if (!semester) {
            return res.status(500).json({ message: "Failed to create semester" });
        }
        res.status(201).json({
            message: "Semester created successfully",
            semester,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createSemester = createSemester;
const getAllSemesters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const semesters = yield semesterService.getAllSemesters();
        res.status(200).json({ semesters });
    }
    catch (error) {
        if (error.message) {
            return res.status(404).json({ message: "No semesters found" });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllSemesters = getAllSemesters;
const getSemesterById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { semesterId } = req.params;
        if (!semesterId) {
            return res.status(400).json({ message: "Semester ID is required" });
        }
        const semester = yield semesterService.getSemesterById(semesterId);
        res.status(200).json({ semester });
    }
    catch (error) {
        if (error.message) {
            return res.status(404).json({ message: "Semester not found" });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getSemesterById = getSemesterById;
const updateSemester = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { semesterId } = req.params;
        const { name, startDate, endDate } = req.body;
        const semester = yield semesterService.updateSemester(semesterId, name, startDate, endDate);
        res
            .status(200)
            .json({ message: "Semester updated successfully", semester });
    }
    catch (error) {
        if (error.message) {
            return res.status(404).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateSemester = updateSemester;
const deleteSemester = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { semesterId } = req.params;
        if (!semesterId) {
            return res.status(400).json({ message: "Semester ID is required" });
        }
        const semester = yield semesterService.deleteSemester(semesterId);
        if (!semester) {
            return res.status(404).json({ message: "Semester not found" });
        }
        res.status(200).json({ message: "Semester deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteSemester = deleteSemester;
const getSemesterGrades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { semesterId } = req.params;
        if (!semesterId) {
            return res.status(400).json({ message: "Semester ID is required" });
        }
        const grades = yield semesterService.getSemesterGrades(semesterId);
        res.status(200).json({ grades });
    }
    catch (error) {
        if (error.message) {
            return res.status(404).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getSemesterGrades = getSemesterGrades;
const getStudentEnrolledCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { semesterId } = req.params;
        if (!semesterId) {
            return res.status(400).json({ message: "Semester ID is required" });
        }
        const studentCourses = yield semesterService.getStudentEnrolledCourses(semesterId);
        res.status(200).json({ studentCourses });
    }
    catch (error) {
        if (error.message) {
            return res.status(404).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getStudentEnrolledCourses = getStudentEnrolledCourses;
