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
exports.deleteAttendance = exports.updateAttendanceStatus = exports.getAttendanceByStudentAndLecture = exports.getAttendanceByLecture = exports.getAttendanceByStudent = exports.getAllAttendances = exports.createAttendance = void 0;
const attendanceService_1 = require("../services/attendanceService");
const attendanceService = new attendanceService_1.AttendanceService();
const createAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { studentId, lectureId, status, lectureDate } = req.body;
        if (!studentId || !lectureId || !status) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const attendanceRecord = yield attendanceService.createAttendance(user, studentId, lectureId, status, lectureDate);
        res
            .status(201)
            .json({ message: "Signed student successfully", attendanceRecord });
    }
    catch (error) {
        console.log(error.message);
        res
            .status(500)
            .json({ message: "Internal server error: " + error.message });
    }
});
exports.createAttendance = createAttendance;
const getAllAttendances = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const offset = req.query.offset ? parseInt(req.query.offset) : 0;
        const { attendanceRecords, pagination } = yield attendanceService.getAllAttendances(limit, offset);
        res.status(200).json({
            message: "All attendance records",
            attendanceRecords,
            pagination,
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllAttendances = getAllAttendances;
const getAttendanceByStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        if (!studentId) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const attendanceRecords = yield attendanceService.getAttendanceByStudent(studentId);
        res
            .status(200)
            .json({ message: "Attendance records found", attendanceRecords });
    }
    catch (error) {
        if (error.message === "Attendance records not found") {
            return res.status(404).json({ message: error.message });
        }
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAttendanceByStudent = getAttendanceByStudent;
const getAttendanceByLecture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lectureId } = req.params;
        if (!lectureId) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const attendanceRecords = yield attendanceService.getAttendanceByLecture(lectureId);
        res
            .status(200)
            .json({ message: "Attendance records found", attendanceRecords });
    }
    catch (error) {
        if (error.message === "Attendance records not found") {
            return res.status(404).json({ message: error.message });
        }
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAttendanceByLecture = getAttendanceByLecture;
const getAttendanceByStudentAndLecture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, lectureId } = req.params;
        if (!studentId || !lectureId) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const attendanceRecord = yield attendanceService.getAttendanceByStudentAndLecture(studentId, lectureId);
        res
            .status(200)
            .json({ message: "Attendance record found", attendanceRecord });
    }
    catch (error) {
        if (error.message === "Attendance record not found") {
            return res.status(404).json({ message: error.message });
        }
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAttendanceByStudentAndLecture = getAttendanceByStudentAndLecture;
const updateAttendanceStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { attendanceRecordId } = req.params;
        const { status } = req.body;
        if (!attendanceRecordId || !status) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const attendanceRecord = yield attendanceService.updateAttendanceStatus(attendanceRecordId, status);
        res
            .status(200)
            .json({ message: "Attendance record updated", attendanceRecord });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateAttendanceStatus = updateAttendanceStatus;
const deleteAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { attendanceRecordId } = req.params;
        if (!attendanceRecordId) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        yield attendanceService.deleteAttendance(attendanceRecordId);
        res.status(200).json({ message: "Attendance record deleted" });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteAttendance = deleteAttendance;
