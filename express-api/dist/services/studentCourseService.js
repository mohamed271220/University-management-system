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
exports.StudentCourseService = void 0;
const Course_1 = __importDefault(require("../models/Course"));
const Semester_1 = __importDefault(require("../models/Semester"));
const User_1 = __importDefault(require("../models/User"));
class StudentCourseService {
    constructor(studentCourseModel) {
        this.studentCourseModel = studentCourseModel;
    }
    enrollCourses(studentId, courses, semesterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield User_1.default.findByPk(studentId);
            if (!student || student.role !== "Student") {
                throw new Error("Student not found");
            }
            // Check if the student is already enrolled in any of the courses for the same semester
            const existingEnrollments = yield this.studentCourseModel.findAll({
                where: {
                    studentId,
                    semesterId,
                    courseId: courses, // Correctly handles array with 'Op.in'
                },
            });
            if (existingEnrollments.length > 0) {
                throw new Error("Student already enrolled in one or more of these courses for this semester. Please update your courses or delete existing enrollments.");
            }
            const studentCourses = yield Promise.all(courses.map((courseId) => __awaiter(this, void 0, void 0, function* () {
                const course = yield Course_1.default.findByPk(courseId);
                if (!course) {
                    throw new Error(`Course with ID ${courseId} not found`);
                }
                return this.studentCourseModel.create({
                    courseId,
                    studentId,
                    semesterId,
                });
            })));
            return studentCourses;
        });
    }
    getStudentCoursesByStudentId(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield User_1.default.findByPk(studentId);
            if (!student || student.role !== "Student") {
                throw new Error("Student not found");
            }
            const studentCourses = yield this.studentCourseModel.findAll({
                where: { studentId },
                include: [
                    {
                        model: Course_1.default,
                    },
                    {
                        model: Semester_1.default,
                    },
                ],
            });
            return studentCourses;
        });
    }
    getStudentsByCourseId(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseStudents = yield this.studentCourseModel.findAll({
                where: { courseId },
                include: [
                    {
                        model: User_1.default,
                        attributes: { exclude: ["passwordHash"] },
                    },
                    {
                        model: Semester_1.default,
                    }
                ],
            });
            return courseStudents;
        });
    }
    getStudentCourseById(studentId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentCourse = yield this.studentCourseModel.findOne({
                where: { studentId, courseId },
                include: [
                    {
                        attributes: { exclude: ["passwordHash"] },
                    },
                    {
                        model: Semester_1.default,
                    }
                ],
            });
            return studentCourse;
        });
    }
    updateStudentCourse(studentId, courseId, semesterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentCourse = yield this.studentCourseModel.findOne({
                where: { studentId, courseId },
            });
            if (!studentCourse) {
                throw new Error("Student course not found");
            }
            studentCourse.semesterId = semesterId;
            yield studentCourse.save();
            return studentCourse;
        });
    }
    deleteStudentCourse(studentId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentCourse = yield this.studentCourseModel.findOne({
                where: { studentId, courseId },
            });
            if (!studentCourse) {
                throw new Error("Student course not found");
            }
            yield studentCourse.destroy();
            return studentCourse;
        });
    }
}
exports.StudentCourseService = StudentCourseService;
