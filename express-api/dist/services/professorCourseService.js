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
exports.ProfessorCourseService = void 0;
const Course_1 = __importDefault(require("../models/Course"));
const User_1 = __importDefault(require("../models/User"));
const CustomError_1 = require("../utils/CustomError");
class ProfessorCourseService {
    constructor(professorCourseModel) {
        this.professorCourseModel = professorCourseModel;
    }
    createProfessorCourse(courseId, professorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [professor, course] = yield Promise.all([
                User_1.default.findByPk(professorId),
                Course_1.default.findByPk(courseId),
            ]);
            // const professor = await User.findByPk(professorId);
            if (!professor || professor.role !== "Professor") {
                throw new CustomError_1.CustomError("Professor not found", 404);
            }
            // const course = await Course.findByPk(courseId);
            if (!course) {
                throw new CustomError_1.CustomError("Course not found", 404);
            }
            const professorCourse = yield this.professorCourseModel.create({
                courseId,
                professorId,
            });
            return professorCourse;
        });
    }
    getProfessorsByCourseId(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield Course_1.default.findByPk(courseId);
            if (!course) {
                throw new CustomError_1.CustomError("Course not found", 404);
            }
            const courseProf = yield this.professorCourseModel.findAll({
                where: { courseId },
                include: [
                    {
                        model: User_1.default,
                        attributes: { exclude: ["passwordHash", "email", "id"] },
                    },
                ],
            });
            return courseProf;
        });
    }
    getAllProfessorCourses(professorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const professor = yield User_1.default.findByPk(professorId);
            if (!professor || professor.role !== "Professor") {
                throw new CustomError_1.CustomError("Professor not found", 404);
            }
            const professorCourses = yield this.professorCourseModel.findAll({
                where: { professorId },
                include: [
                    {
                        model: User_1.default,
                        attributes: { exclude: ["passwordHash", "email", "id"] },
                    },
                ],
            });
            return professorCourses;
        });
    }
    getAllCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            const professorCourses = yield this.professorCourseModel.findAll({
                include: [
                    {
                        model: User_1.default,
                        attributes: { exclude: ["passwordHash", "email"] },
                    },
                    {
                        model: Course_1.default,
                    },
                ],
            });
            return professorCourses;
        });
    }
    getProfessorCourseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const professorCourse = yield this.professorCourseModel.findByPk(id, {
                include: [
                    {
                        model: User_1.default,
                        attributes: { exclude: ["passwordHash", "email"] },
                    },
                    {
                        model: Course_1.default,
                    },
                ],
            });
            return professorCourse;
        });
    }
    deleteProfessorCourse(courseId, professorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [professor, course] = yield Promise.all([
                User_1.default.findByPk(professorId),
                Course_1.default.findByPk(courseId),
            ]);
            // const course = await Course.findByPk(courseId);
            if (!course) {
                throw new CustomError_1.CustomError("Course not found", 404);
            }
            // const professor = await User.findByPk(professorId);
            if (!professor || professor.role !== "Professor") {
                throw new CustomError_1.CustomError("Professor not found", 404);
            }
            const professorCourse = yield this.professorCourseModel.findOne({
                where: { courseId, professorId },
            });
            if (!professorCourse) {
                throw new CustomError_1.CustomError("Professor course not found", 404);
            }
            yield professorCourse.destroy();
        });
    }
}
exports.ProfessorCourseService = ProfessorCourseService;
