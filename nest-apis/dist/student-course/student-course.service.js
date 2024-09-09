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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentCourseService = void 0;
const common_1 = require("@nestjs/common");
const student_course_entity_1 = require("./student-course.entity");
const user_entity_1 = require("../user/user.entity");
const course_entity_1 = require("../course/course.entity");
const sequelize_1 = require("@nestjs/sequelize");
const semester_entity_1 = require("../semester/semester.entity");
let StudentCourseService = class StudentCourseService {
    constructor(studentCourseModel, userModel, courseModel, semesterModel) {
        this.studentCourseModel = studentCourseModel;
        this.userModel = userModel;
        this.courseModel = courseModel;
        this.semesterModel = semesterModel;
    }
    enrollStudentInCourse(studentId, createStudentCourseDto, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (studentId !== (user === null || user === void 0 ? void 0 : user.id) &&
                (user === null || user === void 0 ? void 0 : user.role) !== 'Student' &&
                (user === null || user === void 0 ? void 0 : user.role) !== 'Admin') {
                throw new common_1.UnauthorizedException('Unauthorized');
            }
            const { courses, semesterId } = createStudentCourseDto;
            const [student, semester] = yield Promise.all([
                this.userModel.findByPk(studentId),
                this.semesterModel.findByPk(semesterId),
            ]);
            if (!student || student.role !== 'Student') {
                throw new common_1.NotFoundException('Student not found');
            }
            if (!semester) {
                throw new common_1.NotFoundException('Semester not found');
            }
            const existingEnrollments = yield this.studentCourseModel.findAll({
                where: {
                    studentId,
                    semesterId,
                    courseId: courses,
                },
            });
            if (existingEnrollments.length > 0) {
                throw new common_1.BadRequestException('Student already enrolled in one or more of these courses for this semester. Please update your courses or delete existing enrollments.');
            }
            const studentCourses = yield Promise.all(courses.map((courseId) => __awaiter(this, void 0, void 0, function* () {
                const course = yield this.courseModel.findByPk(courseId);
                if (!course) {
                    throw new common_1.NotFoundException(`Course with ID ${courseId} not found`);
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
    getStudentCoursesByStudentId(studentId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (studentId !== (user === null || user === void 0 ? void 0 : user.id) && (user === null || user === void 0 ? void 0 : user.role) !== 'Admin') {
                throw new common_1.UnauthorizedException('Unauthorized');
            }
            const student = yield this.userModel.findByPk(studentId);
            if (!student || student.role !== 'Student') {
                throw new common_1.NotFoundException('Student not found');
            }
            const studentCourses = yield this.studentCourseModel.findAll({
                raw: true,
                nest: true,
                where: { studentId },
                include: [
                    {
                        model: this.courseModel,
                        as: 'course',
                    },
                    {
                        model: this.semesterModel,
                        as: 'semester',
                    },
                ],
            });
            return studentCourses;
        });
    }
    getStudentsByCourseId(courseId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((user === null || user === void 0 ? void 0 : user.role) !== 'Admin' &&
                (user === null || user === void 0 ? void 0 : user.role) !== 'Staff' &&
                (user === null || user === void 0 ? void 0 : user.role) !== 'Professor') {
                throw new common_1.UnauthorizedException('Unauthorized');
            }
            const course = yield this.courseModel.findByPk(courseId);
            if (!course) {
                throw new common_1.NotFoundException('Course not found');
            }
            if ((user === null || user === void 0 ? void 0 : user.role) === 'Professor' && (user === null || user === void 0 ? void 0 : user.id) !== course.professorId) {
                throw new common_1.UnauthorizedException('Unauthorized');
            }
            const courseStudents = yield this.studentCourseModel.findAll({
                raw: true,
                nest: true,
                where: { courseId },
                include: [
                    {
                        model: this.userModel,
                        as: 'student',
                    },
                    {
                        model: this.semesterModel,
                        as: 'semester',
                    },
                ],
            });
            return courseStudents;
        });
    }
    getStudentCourseById(studentId, courseId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (studentId !== (user === null || user === void 0 ? void 0 : user.id) &&
                (user === null || user === void 0 ? void 0 : user.role) !== 'Admin' &&
                (user === null || user === void 0 ? void 0 : user.role) !== 'Staff' &&
                (user === null || user === void 0 ? void 0 : user.role) !== 'Professor') {
                throw new common_1.UnauthorizedException('Unauthorized');
            }
            const studentCourse = yield this.studentCourseModel.findOne({
                raw: true,
                nest: true,
                where: { studentId, courseId },
                include: [
                    {
                        model: this.userModel,
                        as: 'student',
                    },
                    {
                        model: this.courseModel,
                        as: 'course',
                    },
                    {
                        model: this.semesterModel,
                        as: 'semester',
                    },
                ],
            });
            if (!studentCourse) {
                throw new common_1.NotFoundException('Student course not found');
            }
            return studentCourse;
        });
    }
    updateStudentCourse(studentId, courseId, updateStudentCourseDto, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (studentId !== (user === null || user === void 0 ? void 0 : user.id) && (user === null || user === void 0 ? void 0 : user.role) !== 'Admin') {
                throw new common_1.UnauthorizedException('Unauthorized');
            }
            const studentCourse = yield this.studentCourseModel.findOne({
                where: { studentId, courseId },
            });
            if (!studentCourse) {
                throw new common_1.NotFoundException('Student course not found');
            }
            yield studentCourse.update(updateStudentCourseDto);
            return studentCourse;
        });
    }
    removeStudentFromCourse(studentId, courseId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (studentId !== (user === null || user === void 0 ? void 0 : user.id) && (user === null || user === void 0 ? void 0 : user.role) !== 'Admin') {
                throw new common_1.UnauthorizedException('Unauthorized');
            }
            const studentCourse = yield this.studentCourseModel.findOne({
                where: { studentId, courseId },
            });
            if (!studentCourse) {
                throw new common_1.NotFoundException('Student course not found');
            }
            yield studentCourse.destroy();
            return { message: 'Student removed from course' };
        });
    }
};
exports.StudentCourseService = StudentCourseService;
exports.StudentCourseService = StudentCourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(student_course_entity_1.StudentCourse)),
    __param(1, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __param(2, (0, sequelize_1.InjectModel)(course_entity_1.Course)),
    __param(3, (0, sequelize_1.InjectModel)(semester_entity_1.Semester)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], StudentCourseService);
//# sourceMappingURL=student-course.service.js.map