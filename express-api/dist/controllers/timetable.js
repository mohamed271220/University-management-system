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
exports.getDepartmentYearTimetable = exports.getHallTimetable = exports.getDepartmentTimetable = exports.getProfessorTimetable = exports.getStudentTimetable = void 0;
const timetableService_1 = require("../services/timetableService");
const timetableService = new timetableService_1.TimetableService();
const getStudentTimetable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, semesterId } = req.params;
        if (!studentId) {
            return res.status(400).json({ message: "Student ID is required" });
        }
        const timetable = yield timetableService.getStudentTimetable(studentId, semesterId);
        if (!timetable) {
            return res.status(404).json({ message: "Student timetable not found" });
        }
        res.status(200).json({ message: "Student timetable found", timetable });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getStudentTimetable = getStudentTimetable;
const getProfessorTimetable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { professorId } = req.params;
        if (!professorId) {
            return res.status(400).json({ message: "Professor ID is required" });
        }
        const timetable = yield timetableService.getProfessorTimetable(professorId);
        if (!timetable) {
            return res.status(404).json({ message: "Professor timetable not found" });
        }
        res.status(200).json({ message: "Professor timetable found", timetable });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getProfessorTimetable = getProfessorTimetable;
const getDepartmentTimetable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { departmentId } = req.params;
        if (!departmentId) {
            return res.status(400).json({ message: "Department ID is required" });
        }
        const timetable = yield timetableService.getDepartmentTimetable(departmentId);
        if (!timetable) {
            return res
                .status(404)
                .json({ message: "Department timetable not found" });
        }
        res.status(200).json({ message: "Department timetable found", timetable });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getDepartmentTimetable = getDepartmentTimetable;
const getHallTimetable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hallId } = req.params;
        if (!hallId) {
            return res.status(400).json({ message: "Hall ID is required" });
        }
        const timetable = yield timetableService.getHallTimetable(hallId);
        if (!timetable) {
            return res.status(404).json({ message: "Hall timetable not found" });
        }
        res.status(200).json({ message: "Hall timetable found", timetable });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getHallTimetable = getHallTimetable;
const getDepartmentYearTimetable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departmentId = req.params.departmentId;
        const year = req.query.year;
        if (!departmentId || !year) {
            return res
                .status(400)
                .json({ message: "Department ID and year are required" });
        }
        const timetable = yield timetableService.getDepartmentYearTimetable(departmentId, year);
        if (!timetable) {
            return res
                .status(404)
                .json({ message: "Student year timetable not found" });
        }
        res
            .status(200)
            .json({ message: "Student year timetable found", timetable });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getDepartmentYearTimetable = getDepartmentYearTimetable;
