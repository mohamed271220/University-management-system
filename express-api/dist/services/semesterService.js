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
exports.SemesterService = void 0;
const Grade_1 = __importDefault(require("../models/Grade"));
const uuid_1 = require("uuid");
const StudentCourses_1 = __importDefault(require("../models/StudentCourses"));
class SemesterService {
    constructor(semesterModel) {
        this.semesterModel = semesterModel;
    }
    createSemester(semesterName, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const semester = yield this.semesterModel.create({
                id: (0, uuid_1.v4)(),
                name: semesterName,
                startDate,
                endDate,
            });
            return semester;
        });
    }
    getAllSemesters() {
        return __awaiter(this, void 0, void 0, function* () {
            const semesters = yield this.semesterModel.findAll();
            if (!semesters) {
                throw new Error("No semesters found");
            }
            return semesters;
        });
    }
    getSemesterById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const semester = yield this.semesterModel.findByPk(id);
            if (!semester) {
                throw new Error("Semester not found");
            }
            return semester;
        });
    }
    updateSemester(id, semesterName, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const semester = yield this.semesterModel.findByPk(id);
            if (!semester) {
                throw new Error("Semester not found");
            }
            // console.log(semesterName, startDate, endDate);
            if (semesterName !== undefined) {
                semester.name = semesterName;
            }
            if (startDate !== undefined) {
                semester.startDate = startDate;
            }
            if (endDate !== undefined) {
                semester.endDate = endDate;
            }
            yield semester.save();
            return semester;
        });
    }
    deleteSemester(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const semester = yield this.semesterModel.findByPk(id);
            if (!semester) {
                throw new Error("Semester not found");
            }
            yield semester.destroy();
            return semester;
        });
    }
    getSemesterGrades(semesterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const grades = yield Grade_1.default.findAll({
                where: {
                    semesterId,
                },
            });
            if (!grades) {
                throw new Error("No grades found for this semester");
            }
            return grades;
        });
    }
    getStudentEnrolledCourses(semesterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const enrollments = yield StudentCourses_1.default.findAll({
                where: {
                    semesterId,
                },
            });
            if (!enrollments) {
                throw new Error("No student enrollments found for this semester");
            }
            return enrollments;
        });
    }
}
exports.SemesterService = SemesterService;
