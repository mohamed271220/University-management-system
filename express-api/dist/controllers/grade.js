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
exports.getGradesByProfessor = exports.getGradesBySemester = exports.getGradesByCourse = exports.deleteGrade = exports.updateGrade = exports.getGradesByStudentAndSemester = exports.getGradesByStudent = exports.getGradeById = exports.getAllGrades = exports.createGrade = void 0;
const gradeService_1 = require("../services/gradeService");
const gradeService = new gradeService_1.GradeService();
// api/v1/grades
const createGrade = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, courseId, semesterId, grade, date, description } = req.body;
        const { user } = req;
        const newGrade = yield gradeService.createGrade({
            studentId,
            courseId,
            semesterId,
            grade,
            date,
            description,
        }, user);
        res
            .status(201)
            .json({ success: true, message: "Created grade successfully", newGrade });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.createGrade = createGrade;
const getAllGrades = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const offset = req.query.offset ? parseInt(req.query.offset) : 0;
        const { grades, pagination } = yield gradeService.getAllGrades(limit, offset);
        res
            .status(200)
            .json({ success: true, message: "All grades", grades, pagination });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllGrades = getAllGrades;
const getGradeById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const grade = yield gradeService.getGradeById(id);
    res.status(200).json({ success: true, message: "Found the grade", grade });
    try {
    }
    catch (error) {
        next(error);
    }
});
exports.getGradeById = getGradeById;
const getGradesByStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const grades = yield gradeService.getGradesByStudent(studentId);
        res.status(200).json({
            success: true,
            message: "Fetched student's grades successfully",
            grades,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getGradesByStudent = getGradesByStudent;
const getGradesByStudentAndSemester = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, semesterId } = req.params;
        const grades = yield gradeService.getGradesByStudentAndSemester(studentId, semesterId);
        res.status(200).json({
            success: true,
            message: "Fetched student's grades by semester",
            grades,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getGradesByStudentAndSemester = getGradesByStudentAndSemester;
const updateGrade = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { studentId, courseId, semesterId, grade, date, description } = req.body;
        const updatedGrade = yield gradeService.updateGrade(id, {
            studentId,
            courseId,
            semesterId,
            grade,
            date,
            description,
        }, req.user);
        res.status(200).json({
            success: true,
            message: "Updated grade successfully",
            updatedGrade,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateGrade = updateGrade;
const deleteGrade = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedGrade = yield gradeService.deleteGrade(id);
        res.status(200).json({
            success: true,
            message: "Deleted grade successfully",
            deletedGrade,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteGrade = deleteGrade;
const getGradesByCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId } = req.params;
        const grades = yield gradeService.getGradesByCourse(courseId);
        res.status(200).json({
            success: true,
            message: "Fetched grades by course successfully",
            grades,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getGradesByCourse = getGradesByCourse;
const getGradesBySemester = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { semesterId } = req.params;
        const grades = yield gradeService.getGradesBySemester(semesterId);
        res.status(200).json({
            success: true,
            message: "Fetched grades by semester successfully",
            grades,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getGradesBySemester = getGradesBySemester;
const getGradesByProfessor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { professorId } = req.params;
        const grades = yield gradeService.getGradesByProfessor(professorId);
        res.status(200).json({
            success: true,
            message: "Fetched grades by professor successfully",
            grades,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getGradesByProfessor = getGradesByProfessor;
