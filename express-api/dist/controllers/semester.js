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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentEnrolledCourses = exports.getSemesterGrades = exports.deleteSemester = exports.updateSemester = exports.getSemesterById = exports.getAllSemesters = exports.createSemester = void 0;
const semesterService_1 = require("../services/semesterService");
const CustomError_1 = require("../utils/CustomError");
const semesterService = new semesterService_1.SemesterService();
const createSemester = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, startDate, endDate } = req.body;
        const semester = yield semesterService.createSemester(name, startDate, endDate);
        if (!semester) {
            throw new CustomError_1.CustomError("Semester not created", 500);
        }
        res.status(201).json({
            message: "Semester created successfully",
            semester,
        });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.createSemester = createSemester;
const getAllSemesters = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const semesters = yield semesterService.getAllSemesters();
        res.status(200).json({ semesters });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getAllSemesters = getAllSemesters;
const getSemesterById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { semesterId } = req.params;
        if (!semesterId) {
            throw new CustomError_1.CustomError("Semester ID is required", 400);
        }
        const semester = yield semesterService.getSemesterById(semesterId);
        res.status(200).json({ semester });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getSemesterById = getSemesterById;
const updateSemester = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { semesterId } = req.params;
        const { name, startDate, endDate } = req.body;
        const semester = yield semesterService.updateSemester(semesterId, name, startDate, endDate);
        res
            .status(200)
            .json({ message: "Semester updated successfully", semester });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.updateSemester = updateSemester;
const deleteSemester = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { semesterId } = req.params;
        if (!semesterId) {
            throw new CustomError_1.CustomError("Semester ID is required", 400);
        }
        yield semesterService.deleteSemester(semesterId);
        res.status(200).json({ message: "Semester deleted successfully" });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.deleteSemester = deleteSemester;
const getSemesterGrades = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { semesterId } = req.params;
        if (!semesterId) {
            throw new CustomError_1.CustomError("Semester ID is required", 400);
        }
        const grades = yield semesterService.getSemesterGrades(semesterId);
        res.status(200).json({ grades });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getSemesterGrades = getSemesterGrades;
const getStudentEnrolledCourses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { semesterId } = req.params;
        if (!semesterId) {
            throw new CustomError_1.CustomError("Semester ID is required", 400);
        }
        const studentCourses = yield semesterService.getStudentEnrolledCourses(semesterId);
        res.status(200).json({ studentCourses });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getStudentEnrolledCourses = getStudentEnrolledCourses;
