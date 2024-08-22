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
exports.StudentYearService = void 0;
const StudentYears_1 = __importDefault(require("../models/StudentYears"));
const uuid_1 = require("uuid");
const User_1 = __importDefault(require("../models/User"));
class StudentYearService {
    constructor(studentYearModel = StudentYears_1.default) {
        this.studentYearModel = studentYearModel;
    }
    createStudentYear(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { year, studentId, effectiveDate, departmentId } = data;
            const existingStudentYear = yield this.studentYearModel.findOne({
                where: { studentId, effectiveDate },
            });
            if (existingStudentYear) {
                throw new Error("Student year already exists");
            }
            const student = yield User_1.default.findOne({ where: { id: studentId } });
            if (!student || student.role !== "Student") {
                throw new Error("Student not found");
            }
            const newStudentYear = yield this.studentYearModel.create({
                id: (0, uuid_1.v4)(),
                year,
                studentId,
                departmentId,
                effectiveDate,
            });
            return newStudentYear;
        });
    }
    getAllStudentYears() {
        return __awaiter(this, void 0, void 0, function* () {
            const studentYears = yield this.studentYearModel.findAll();
            return studentYears;
        });
    }
    getYearRecordsByStudent(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentYears = yield this.studentYearModel.findAll({
                where: { studentId },
            });
            if (!studentYears) {
                throw new Error("no student year records not found");
            }
            return studentYears;
        });
    }
    updateStudentYear(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { year, studentId, effectiveDate, departmentId } = data;
            const studentYear = yield this.studentYearModel.findOne({ where: { id } });
            if (!studentYear) {
                throw new Error("Student year not found");
            }
            if (year !== undefined)
                studentYear.year = year;
            if (studentId !== undefined)
                studentYear.studentId = studentId;
            if (effectiveDate !== undefined)
                studentYear.effectiveDate = effectiveDate;
            if (departmentId !== undefined)
                studentYear.departmentId = departmentId;
            yield studentYear.save();
            return studentYear;
        });
    }
    deleteStudentYear(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentYear = yield this.studentYearModel.findOne({ where: { id } });
            if (!studentYear) {
                throw new Error("Student year not found");
            }
            yield studentYear.destroy();
            return studentYear;
        });
    }
}
exports.StudentYearService = StudentYearService;
