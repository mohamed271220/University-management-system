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
exports.CourseService = void 0;
const Course_1 = __importDefault(require("../models/Course"));
const uuid_1 = require("uuid");
const Department_1 = __importDefault(require("../models/Department"));
const User_1 = __importDefault(require("../models/User"));
const Profile_1 = __importDefault(require("../models/Profile"));
const Lecture_1 = __importDefault(require("../models/Lecture"));
const Hall_1 = __importDefault(require("../models/Hall"));
const sequelize_1 = require("sequelize");
class CourseService {
    constructor(courseModel) {
        this.courseModel = courseModel;
    }
    createCourse(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { code, name, description, credits, departmentId, professorId } = data;
            const existingCourse = yield this.courseModel.findOne({
                where: { code },
            });
            if (existingCourse) {
                throw new Error("A course with this code already exists");
            }
            const course = yield this.courseModel.create({
                id: (0, uuid_1.v4)(),
                code,
                name,
                description,
                credits,
                departmentId,
                professorId,
            });
            return course;
        });
    }
    getAllCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield this.courseModel.findAll({
                include: [
                    {
                        model: Department_1.default,
                        attributes: ["name", "code"],
                    },
                    {
                        model: User_1.default,
                        as: "professor",
                        attributes: ["username"],
                    },
                ],
            });
            return courses;
        });
    }
    getCourseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield this.courseModel.findByPk(id, {
                include: [
                    {
                        model: Department_1.default,
                        attributes: ["name", "code"],
                    },
                    {
                        model: User_1.default,
                        as: "professor",
                        attributes: ["username"],
                    },
                ],
            });
            return course;
        });
    }
    updateCourse(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield this.courseModel.findByPk(id);
            if (!course) {
                throw new Error("Course not found");
            }
            const existingCourse = yield this.courseModel.findOne({
                where: {
                    code: data.code,
                    id: { [sequelize_1.Op.ne]: id }, // Ensure the course found is not the same as the current course
                },
            });
            if (existingCourse) {
                throw new Error("A course with this code already exists");
            }
            const { code, name, description, credits, departmentId, professorId } = data;
            if (code)
                course.code = code;
            if (name)
                course.name = name;
            if (description)
                course.description = description;
            if (credits)
                course.credits = credits;
            if (departmentId)
                course.departmentId = departmentId;
            if (professorId)
                course.professorId = professorId;
            yield course.save();
            return course;
        });
    }
    deleteCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield this.courseModel.findByPk(id);
            if (!course)
                throw new Error("Course not found");
            yield course.destroy();
        });
    }
    getProfessorByCourseId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield Course_1.default.findByPk(id, {
                include: [
                    {
                        model: User_1.default,
                        as: "professors",
                        attributes: ["id", "username"],
                    },
                ],
            });
            if (!course)
                throw new Error("Course not found");
            return course.professors;
        });
    }
    getStudentsByCourseId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield Course_1.default.findByPk(id, {
                include: [
                    {
                        model: User_1.default,
                        as: "students",
                        include: [
                            {
                                model: Profile_1.default,
                                attributes: ["firstName", "lastName"],
                            },
                        ],
                        attributes: ["id", "username"],
                    },
                ],
            });
            if (!course)
                throw new Error("Course not found");
            return course;
        });
    }
    getLecturesByCourseId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield Course_1.default.findByPk(id, {
                include: [
                    {
                        model: Lecture_1.default,
                        as: "Lectures",
                        include: [
                            {
                                model: Hall_1.default,
                                attributes: ["name"],
                            },
                        ],
                    },
                ],
            });
            if (!course)
                throw new Error("Course not found");
            return course.Lectures;
        });
    }
}
exports.CourseService = CourseService;
