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
exports.SemesterService = void 0;
const common_1 = require("@nestjs/common");
const course_entity_1 = require("../course/course.entity");
const grade_entity_1 = require("../grade/grade.entity");
const user_entity_1 = require("../user/user.entity");
const semester_entity_1 = require("./semester.entity");
const sequelize_1 = require("@nestjs/sequelize");
const student_course_entity_1 = require("../student-course/student-course.entity");
const uuid_1 = require("uuid");
let SemesterService = class SemesterService {
    constructor(semesterModel, courseModel, gradeModel, userUserModel, studentCourseModel) {
        this.semesterModel = semesterModel;
        this.courseModel = courseModel;
        this.gradeModel = gradeModel;
        this.userUserModel = userUserModel;
        this.studentCourseModel = studentCourseModel;
    }
    createSemester(createSemesterDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = createSemesterDto;
            const existingSemester = yield this.semesterModel.findOne({
                where: { name },
            });
            if (existingSemester) {
                throw new common_1.BadRequestException('Semester already exists.');
            }
            const semester = yield this.semesterModel.create(Object.assign({ id: (0, uuid_1.v4)() }, createSemesterDto));
            return semester;
        });
    }
    getAllSemesters() {
        return __awaiter(this, void 0, void 0, function* () {
            const semesters = yield this.semesterModel.findAll({
                raw: true,
                nest: true,
            });
            return semesters;
        });
    }
    getSemester(semesterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const semester = yield this.semesterModel.findByPk(semesterId, {
                raw: true,
            });
            if (!semester) {
                throw new common_1.NotFoundException('Semester not found.');
            }
            return semester;
        });
    }
    getSemesterGrades(semesterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const semester = yield this.semesterModel.findByPk(semesterId);
            if (!semester) {
                throw new common_1.NotFoundException('Semester not found.');
            }
            const grades = yield this.gradeModel.findAll({
                where: { semesterId },
                include: [this.semesterModel],
                raw: true,
                nest: true,
            });
            return grades;
        });
    }
    getStudentEnrolledCourses(semesterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentCourses = yield this.studentCourseModel.findAll({
                where: { semesterId },
                include: [this.semesterModel, this.courseModel, this.userUserModel],
                raw: true,
                nest: true,
            });
            return studentCourses;
        });
    }
    updateSemester(semesterId, updateSemesterDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const semester = yield this.semesterModel.findByPk(semesterId);
            if (!semester) {
                throw new common_1.BadRequestException('Semester not found.');
            }
            yield semester.update(updateSemesterDto);
            return semester;
        });
    }
    deleteSemester(semesterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const semester = yield this.semesterModel.findByPk(semesterId);
            if (!semester) {
                throw new common_1.BadRequestException('Semester not found.');
            }
            yield semester.destroy();
            return { message: 'Semester deleted successfully.' };
        });
    }
};
exports.SemesterService = SemesterService;
exports.SemesterService = SemesterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(semester_entity_1.Semester)),
    __param(1, (0, sequelize_1.InjectModel)(course_entity_1.Course)),
    __param(2, (0, sequelize_1.InjectModel)(grade_entity_1.Grade)),
    __param(3, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __param(4, (0, sequelize_1.InjectModel)(student_course_entity_1.StudentCourse)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], SemesterService);
//# sourceMappingURL=semester.service.js.map