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
exports.getHistoryByLecture = exports.archiveLecture = exports.getAttendanceByLecture = exports.deleteLecture = exports.updateLecture = exports.getLectureById = exports.getAllLectures = exports.createLecture = void 0;
const lectureService_1 = require("../services/lectureService");
const lectureService = new lectureService_1.LectureService();
const createLecture = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { professorId, hallId, courseId, dayOfWeek, startTime, endTime, recurrencePattern, recurrenceEndDate, } = req.body;
        const lecture = yield lectureService.createLecture({
            professorId,
            hallId,
            courseId,
            dayOfWeek,
            startTime,
            endTime,
            recurrencePattern,
            recurrenceEndDate,
        });
        res.status(201).json({ message: "Lecture created successfully", lecture });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.createLecture = createLecture;
const getAllLectures = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const offset = req.query.offset ? parseInt(req.query.offset) : 0;
        const querySearch = req.query.search ? req.query.search : "";
        const { lectures, pagination } = yield lectureService.getAllLectures(offset, limit, querySearch);
        res.status(200).json({
            message: "Lectures retrieved successfully",
            lectures,
            pagination,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getAllLectures = getAllLectures;
const getLectureById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lectureId } = req.params;
        const lecture = yield lectureService.getLectureById(lectureId);
        res
            .status(200)
            .json({ message: "Lecture retrieved successfully", lecture });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getLectureById = getLectureById;
const updateLecture = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lectureId } = req.params;
        const { professorId, hallId, courseId, dayOfWeek, startTime, endTime, recurrencePattern, recurrenceEndDate, } = req.body;
        const updatedLecture = yield lectureService.updateLecture(lectureId, {
            professorId,
            hallId,
            courseId,
            dayOfWeek,
            startTime,
            endTime,
            recurrencePattern,
            recurrenceEndDate,
        });
        res.status(200).json({
            message: "Lecture updated successfully",
            lecture: updatedLecture,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.updateLecture = updateLecture;
const deleteLecture = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lectureId } = req.params;
        yield lectureService.deleteLecture(lectureId);
        res.status(200).json({ message: "Lecture deleted successfully" });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.deleteLecture = deleteLecture;
const getAttendanceByLecture = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lectureId } = req.params;
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const offset = req.query.offset ? parseInt(req.query.offset) : 0;
        const { attendance, pagination } = yield lectureService.getAttendanceByLecture(lectureId, offset, limit);
        res.status(200).json({
            message: "Attendance retrieved successfully",
            attendance,
            pagination,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getAttendanceByLecture = getAttendanceByLecture;
const archiveLecture = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lectureId } = req.params;
        yield lectureService.archiveLecture(lectureId);
        res.status(200).json({ message: "Lecture archived successfully" });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.archiveLecture = archiveLecture;
// TODO
const getHistoryByLecture = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lectureId } = req.params;
        const history = yield lectureService.getLectureHistory(lectureId);
        res
            .status(200)
            .json({ message: "History retrieved successfully", history });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getHistoryByLecture = getHistoryByLecture;
