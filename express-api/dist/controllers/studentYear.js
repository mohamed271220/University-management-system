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
exports.deleteStudentYear = exports.updateStudentYear = exports.getYearRecordsByStudent = exports.getAllStudentYears = exports.createStudentYear = void 0;
const studentYearService_1 = require("../services/studentYearService");
const studentYearService = new studentYearService_1.StudentYearService();
const createStudentYear = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentYear = req.body;
        const newStudentYear = yield studentYearService.createStudentYear(studentYear);
        res
            .status(201)
            .json({ message: "Student year created", studentYear: newStudentYear });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.createStudentYear = createStudentYear;
const getAllStudentYears = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentYears = yield studentYearService.getAllStudentYears();
        res.status(200).json({ studentYears });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getAllStudentYears = getAllStudentYears;
const getYearRecordsByStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const studentYears = yield studentYearService.getYearRecordsByStudent(studentId);
        res.status(200).json({ studentYears });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getYearRecordsByStudent = getYearRecordsByStudent;
const updateStudentYear = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentYear = req.body;
        const { studentYearId } = req.params;
        const updatedStudentYear = yield studentYearService.updateStudentYear(studentYearId, studentYear);
        res.status(200).json({
            message: "Student year updated",
            studentYear: updatedStudentYear,
        });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.updateStudentYear = updateStudentYear;
const deleteStudentYear = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentYearId } = req.params;
        yield studentYearService.deleteStudentYear(studentYearId);
        res.status(200).json({ message: "Student year deleted" });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.deleteStudentYear = deleteStudentYear;
