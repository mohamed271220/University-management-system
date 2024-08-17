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
        if (!name || !startDate || !endDate) {
            return res.status(400).json({
                message: "Semester name, start date, and end date are required",
            });
        }
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
const getAllSemesters = () => { };
exports.getAllSemesters = getAllSemesters;
const getSemesterById = () => { };
exports.getSemesterById = getSemesterById;
const updateSemester = () => { };
exports.updateSemester = updateSemester;
const deleteSemester = () => { };
exports.deleteSemester = deleteSemester;
const getSemesterGrades = () => { };
exports.getSemesterGrades = getSemesterGrades;
const getStudentEnrolledCourses = () => { };
exports.getStudentEnrolledCourses = getStudentEnrolledCourses;
