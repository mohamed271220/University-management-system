"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("@nestjs/common/exceptions");
const sequelize_1 = require("@nestjs/sequelize");
const course_entity_1 = require("./course.entity");
const department_entity_1 = require("../department/department.entity");
const user_entity_1 = require("../user/user.entity");
const uuid_1 = require("uuid");
const lecture_entity_1 = require("../lecture/lecture.entity");
const sequelize_2 = require("sequelize");
let CourseService = class CourseService {
    constructor(courseModel, departmentModel, userModel, lectureModel) {
        this.courseModel = courseModel;
        this.departmentModel = departmentModel;
        this.userModel = userModel;
        this.lectureModel = lectureModel;
    }
    createCourse(createCourseDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { departmentId, professorId } = createCourseDto, courseData = __rest(createCourseDto, ["departmentId", "professorId"]);
            const existingCourse = yield this.courseModel.findOne({
                where: { code: courseData.code },
            });
            if (existingCourse) {
                throw new exceptions_1.BadRequestException('Course already exists.');
            }
            const department = yield this.departmentModel.findByPk(departmentId);
            if (!department) {
                throw new exceptions_1.NotFoundException('Department not found');
            }
            const professor = yield this.userModel.findByPk(professorId);
            if (!professor || professor.role !== 'Professor') {
                throw new exceptions_1.NotFoundException('Professor not found');
            }
            return this.courseModel.create(Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, courseData), { departmentId,
                professorId }));
        });
    }
    getAllCourses() {
        return __awaiter(this, arguments, void 0, function* (search = '', limit = 10, offset = 0) {
            try {
                const courses = yield this.courseModel.findAll({
                    raw: true,
                    nest: true,
                    where: search
                        ? {
                            name: {
                                [sequelize_2.Op.like]: `%${search}%`,
                            },
                        }
                        : undefined,
                    limit,
                    offset,
                    include: [
                        {
                            model: department_entity_1.Department,
                            as: 'department',
                        },
                        {
                            model: user_entity_1.User,
                            as: 'professor',
                            attributes: ['id', 'username', 'email'],
                        },
                    ],
                });
                return courses;
            }
            catch (error) {
                common_1.Logger.error(error);
                throw new exceptions_1.BadRequestException('Failed to get courses');
            }
        });
    }
    getCourseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.courseModel.findByPk(id, {});
        });
    }
    getCourseLectures(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield this.courseModel.findByPk(courseId);
            if (!course) {
                throw new exceptions_1.NotFoundException('Course not found');
            }
            return this.lectureModel.findAll({
                where: { courseId },
            });
        });
    }
    updateCourse(courseId, updateCourseDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield this.courseModel.findByPk(courseId);
            if (!course) {
                throw new exceptions_1.NotFoundException('Course not found');
            }
            const { departmentId, professorId } = updateCourseDto, courseData = __rest(updateCourseDto, ["departmentId", "professorId"]);
            if (departmentId) {
                const department = yield this.departmentModel.findByPk(departmentId);
                if (!department) {
                    throw new exceptions_1.NotFoundException('Department not found');
                }
            }
            if (professorId) {
                const professor = yield this.userModel.findByPk(professorId);
                if (!professor || professor.role !== 'Professor') {
                    throw new exceptions_1.NotFoundException('Professor not found');
                }
            }
            return course.update(Object.assign(Object.assign({}, courseData), { departmentId,
                professorId }));
        });
    }
    deleteCourse(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield this.courseModel.findByPk(courseId);
            if (!course) {
                throw new exceptions_1.NotFoundException('Course not found');
            }
            yield course.destroy();
        });
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(course_entity_1.Course)),
    __param(1, (0, sequelize_1.InjectModel)(department_entity_1.Department)),
    __param(2, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __param(3, (0, sequelize_1.InjectModel)(lecture_entity_1.Lecture)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], CourseService);
//# sourceMappingURL=course.service.js.map