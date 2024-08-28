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
    }
    catch (error) {
        next(error);
    }
});
exports.createGrade = createGrade;
const getAllGrades = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        next(error);
    }
});
exports.getAllGrades = getAllGrades;
const getGradeById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        next(error);
    }
});
exports.getGradeById = getGradeById;
const getGradesByStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        next(error);
    }
});
exports.getGradesByStudent = getGradesByStudent;
const getGradesByStudentAndSemester = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        next(error);
    }
});
exports.getGradesByStudentAndSemester = getGradesByStudentAndSemester;
const updateGrade = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        next(error);
    }
});
exports.updateGrade = updateGrade;
const deleteGrade = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        next(error);
    }
});
exports.deleteGrade = deleteGrade;
const getGradesByCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        next(error);
    }
});
exports.getGradesByCourse = getGradesByCourse;
const getGradesBySemester = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        next(error);
    }
});
exports.getGradesBySemester = getGradesBySemester;
const getGradesByProfessor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        next(error);
    }
});
exports.getGradesByProfessor = getGradesByProfessor;
