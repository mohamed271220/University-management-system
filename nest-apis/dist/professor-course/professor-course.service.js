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
exports.ProfessorCourseService = void 0;
const common_1 = require("@nestjs/common");
const professor_course_entity_1 = require("./professor-course.entity");
const user_entity_1 = require("../user/user.entity");
const course_entity_1 = require("../course/course.entity");
const sequelize_1 = require("@nestjs/sequelize");
let ProfessorCourseService = class ProfessorCourseService {
    constructor(professorCourseModel, professorModel, courseModel) {
        this.professorCourseModel = professorCourseModel;
        this.professorModel = professorModel;
        this.courseModel = courseModel;
    }
    createProfessorCourse(createProfessorCourseDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { professorId, courseId } = createProfessorCourseDto;
            const [professor, course] = yield Promise.all([
                this.professorModel.findByPk(professorId),
                this.courseModel.findByPk(courseId),
            ]);
            if (!professor) {
                throw new common_1.NotFoundException('Professor not found.');
            }
            if (!course) {
                throw new common_1.NotFoundException('Course not found.');
            }
            const existingProfessorCourse = yield this.professorCourseModel.findOne({
                where: { professorId, courseId },
            });
            if (existingProfessorCourse) {
                throw new common_1.BadRequestException('Professor course already exists.');
            }
            try {
                const professorCourse = yield this.professorCourseModel.create({
                    professorId,
                    courseId,
                });
                return professorCourse;
            }
            catch (error) {
                if (error.name === 'SequelizeUniqueConstraintError') {
                    throw new common_1.BadRequestException('Professor course already exists.');
                }
                throw new common_1.BadRequestException('Error creating professor course.');
            }
        });
    }
    getAllProfessorCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.professorCourseModel.findAll({
                raw: true,
                nest: true,
                include: [
                    {
                        model: this.professorModel,
                        as: 'professor',
                        attributes: ['id', 'username', 'email'],
                    },
                    {
                        model: this.courseModel,
                        as: 'course',
                        attributes: ['id', 'name', 'code'],
                    },
                ],
            });
        });
    }
    getProfessorCourse(professorId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const professorCourse = yield this.professorCourseModel.findOne({
                where: { professorId, courseId },
                raw: true,
                nest: true,
                include: [
                    {
                        model: this.professorModel,
                        as: 'professor',
                        attributes: ['id', 'username', 'email'],
                    },
                    {
                        model: this.courseModel,
                        as: 'course',
                        attributes: ['id', 'name', 'code'],
                    },
                ],
            });
            if (!professorCourse) {
                throw new common_1.NotFoundException('Professor course not found.');
            }
            return professorCourse;
        });
    }
    getProfessorCourses(professorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const professor = yield this.professorModel.findByPk(professorId);
            if (!professor) {
                throw new common_1.NotFoundException('Professor not found.');
            }
            const professorCourses = yield this.professorCourseModel.findAll({
                where: { professorId },
                raw: true,
                nest: true,
                include: [
                    {
                        model: this.professorModel,
                        as: 'professor',
                        attributes: ['id', 'username', 'email'],
                    },
                    {
                        model: this.courseModel,
                        as: 'course',
                        attributes: ['id', 'name', 'code'],
                    },
                ],
            });
            if (!professorCourses) {
                throw new common_1.NotFoundException('Professor courses not found.');
            }
            return professorCourses;
        });
    }
    getCourseProfessors(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield this.courseModel.findByPk(courseId);
            if (!course) {
                throw new common_1.NotFoundException('Course not found.');
            }
            const courseProfessors = yield this.professorCourseModel.findAll({
                where: { courseId },
                raw: true,
                nest: true,
                include: [
                    {
                        model: this.professorModel,
                        attributes: ['id', 'username', 'email'],
                    },
                    {
                        model: this.courseModel,
                        as: 'course',
                        attributes: ['id', 'name', 'code'],
                    },
                ],
            });
            if (!courseProfessors) {
                throw new common_1.NotFoundException('Course professors not found.');
            }
            return courseProfessors;
        });
    }
    deleteProfessorCourse(professorId, courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const professorCourse = yield this.professorCourseModel.findOne({
                where: { professorId, courseId },
            });
            if (!professorCourse) {
                throw new common_1.NotFoundException('Professor course not found.');
            }
            yield professorCourse.destroy();
            return { message: 'Professor course deleted successfully.' };
        });
    }
};
exports.ProfessorCourseService = ProfessorCourseService;
exports.ProfessorCourseService = ProfessorCourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(professor_course_entity_1.ProfessorCourse)),
    __param(1, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __param(2, (0, sequelize_1.InjectModel)(course_entity_1.Course)),
    __metadata("design:paramtypes", [Object, Object, Object])
], ProfessorCourseService);
//# sourceMappingURL=professor-course.service.js.map