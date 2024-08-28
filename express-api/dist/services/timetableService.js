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
exports.TimetableService = void 0;
const Course_1 = __importDefault(require("../models/Course"));
const Department_1 = __importDefault(require("../models/Department"));
const DepartmentYearCourses_1 = __importDefault(require("../models/DepartmentYearCourses"));
const Hall_1 = __importDefault(require("../models/Hall"));
const Lecture_1 = __importDefault(require("../models/Lecture"));
const ProfessorCourses_1 = __importDefault(require("../models/ProfessorCourses"));
const StudentCourses_1 = __importDefault(require("../models/StudentCourses"));
const User_1 = __importDefault(require("../models/User"));
const CustomError_1 = require("../utils/CustomError");
class TimetableService {
    getStudentTimetable(studentId, semesterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield User_1.default.findByPk(studentId);
            if (!student || student.role !== "Student") {
                throw new CustomError_1.CustomError("Student not found", 404);
            }
            const courses = yield StudentCourses_1.default.findAll({
                where: { studentId, semesterId },
            }); // get all courses that the student is enrolled in for certain semester
            const lectures = yield Lecture_1.default.findAll({
                where: { courseId: courses.map((course) => course.courseId) },
                include: [
                    {
                        model: Course_1.default,
                        as: "course",
                    },
                    {
                        model: User_1.default,
                        as: "professor",
                        attributes: { exclude: ["passwordHash"] },
                    },
                    {
                        model: Hall_1.default,
                        as: "hall",
                    },
                ],
            }); // get all lectures for the courses
            return this.buildTimetable(lectures);
        });
    }
    getProfessorTimetable(professorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const professor = yield User_1.default.findByPk(professorId);
            if (!professor || professor.role !== "Professor") {
                throw new CustomError_1.CustomError("Professor not found", 404);
            }
            const courses = yield ProfessorCourses_1.default.findAll({
                where: { professorId },
            });
            if (!courses.length) {
                throw new CustomError_1.CustomError("Professor has no courses assigned", 404);
            }
            const lectures = yield Lecture_1.default.findAll({
                where: { courseId: courses.map((c) => c.courseId) },
                include: [
                    {
                        model: Course_1.default,
                        as: "course",
                    },
                    {
                        model: User_1.default,
                        as: "professor",
                        attributes: { exclude: ["passwordHash"] },
                    },
                    {
                        model: Hall_1.default,
                        as: "hall",
                    },
                ],
            });
            if (!lectures.length) {
                throw new CustomError_1.CustomError("Professor has no lectures assigned", 404);
            }
            return this.buildTimetable(lectures);
        });
    }
    getDepartmentTimetable(departmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield Department_1.default.findByPk(departmentId);
            if (!department) {
                throw new CustomError_1.CustomError("Department not found", 404);
            }
            const courses = yield Course_1.default.findAll({
                where: { departmentId },
            });
            const lectures = yield Lecture_1.default.findAll({
                where: {
                    courseId: courses.map((course) => course.id),
                },
                include: [
                    {
                        model: Course_1.default,
                        as: "course",
                    },
                    {
                        model: User_1.default,
                        as: "professor",
                        attributes: { exclude: ["passwordHash"] },
                    },
                    {
                        model: Hall_1.default,
                        as: "hall",
                    },
                ],
            });
            return this.buildTimetable(lectures);
        });
    }
    getHallTimetable(hallId) {
        return __awaiter(this, void 0, void 0, function* () {
            const hall = yield Hall_1.default.findByPk(hallId);
            if (!hall) {
                throw new CustomError_1.CustomError("Hall not found", 404);
            }
            const lectures = yield Lecture_1.default.findAll({
                where: { hallId },
                include: [
                    {
                        model: Course_1.default,
                        as: "course",
                    },
                    {
                        model: User_1.default,
                        as: "professor",
                        attributes: { exclude: ["passwordHash"] },
                    },
                    {
                        model: Hall_1.default,
                        as: "hall",
                    },
                ],
            }); // get all lectures for the specific hall
            return this.buildTimetable(lectures);
        });
    }
    getDepartmentYearTimetable(departmentId, year) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield Department_1.default.findByPk(departmentId);
            if (!department) {
                throw new CustomError_1.CustomError("Department not found", 404);
            }
            // Get all courses for the department and year
            const departmentCourses = yield DepartmentYearCourses_1.default.findAll({
                where: { departmentId, year },
                include: [{ model: Course_1.default, as: "Course" }],
            });
            // Find all lectures for these courses
            const lectures = yield Lecture_1.default.findAll({
                where: { courseId: departmentCourses.map((dc) => dc.courseId) },
                include: [
                    {
                        model: Course_1.default,
                        as: "course",
                    },
                    {
                        model: User_1.default,
                        as: "professor",
                        attributes: { exclude: ["passwordHash"] },
                    },
                    {
                        model: Hall_1.default,
                        as: "hall",
                    },
                ],
            });
            return this.buildTimetable(lectures);
        });
    }
    buildTimetable(lectures) {
        // Aggregate and format the lectures into a timetable
        return lectures.map((lecture) => ({
            dayOfWeek: lecture.dayOfWeek,
            startTime: lecture.startTime,
            endTime: lecture.endTime,
            course: lecture.course.name,
            professor: lecture.professor.username,
            hall: lecture.hall.name,
        }));
    }
}
exports.TimetableService = TimetableService;
