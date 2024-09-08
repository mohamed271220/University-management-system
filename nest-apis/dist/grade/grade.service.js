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
exports.GradeService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const course_entity_1 = require("../course/course.entity");
const semester_entity_1 = require("../semester/semester.entity");
const user_entity_1 = require("../user/user.entity");
const grade_entity_1 = require("./grade.entity");
const student_course_entity_1 = require("../student-course/student-course.entity");
const uuid_1 = require("uuid");
const professor_course_entity_1 = require("../professor-course/professor-course.entity");
let GradeService = class GradeService {
    constructor(gradeModel, userModel, semesterModel, courseModel, studentCourseModel, professorCourseModel) {
        this.gradeModel = gradeModel;
        this.userModel = userModel;
        this.semesterModel = semesterModel;
        this.courseModel = courseModel;
        this.studentCourseModel = studentCourseModel;
        this.professorCourseModel = professorCourseModel;
    }
    createGrade(user, createGradeDto) {
        return __awaiter(this, void 0, void 0, function* () {
            console.info('user', user.id);
            const [student, course, semester, isTheStudentInTheCourse,] = yield Promise.all([
                this.userModel.findByPk(createGradeDto.studentId),
                this.courseModel.findByPk(createGradeDto.courseId),
                this.semesterModel.findByPk(createGradeDto.semesterId),
                this.studentCourseModel.findOne({
                    where: {
                        studentId: createGradeDto.studentId,
                        courseId: createGradeDto.courseId,
                    },
                }),
            ]);
            if ((user === null || user === void 0 ? void 0 : user.role) === 'Professor') {
                const isTheProTeachingThisCourse = yield this.professorCourseModel.findOne({
                    where: {
                        professorId: user.id,
                        courseId: createGradeDto.courseId,
                    },
                });
                if (!isTheProTeachingThisCourse) {
                    throw new common_1.BadRequestException('Professor is not teaching this course');
                }
            }
            if (!student || student.role !== 'Student') {
                throw new common_1.NotFoundException('Student not found');
            }
            if (!course) {
                throw new common_1.NotFoundException('Course not found');
            }
            if (!semester) {
                throw new common_1.NotFoundException('Semester not found');
            }
            if (!isTheStudentInTheCourse) {
                throw new common_1.BadRequestException('Student is not enrolled in the course');
            }
            try {
                const grade = yield this.gradeModel.create({
                    id: (0, uuid_1.v4)(),
                    studentId: createGradeDto.studentId,
                    courseId: createGradeDto.courseId,
                    semesterId: createGradeDto.semesterId,
                    date: createGradeDto.date,
                    grade: createGradeDto.grade,
                    description: createGradeDto.description,
                });
                return grade;
            }
            catch (error) {
                if (error.name === 'SequelizeUniqueConstraintError') {
                    throw new common_1.BadRequestException('Grade already exists for this student in this course and semester');
                }
                common_1.Logger.error('Failed to create grade', error);
                throw new common_1.BadRequestException('Failed to create grade');
            }
        });
    }
    getAllGrades(search, limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count, rows } = yield this.gradeModel.findAndCountAll({
                nest: true,
                raw: true,
                limit,
                offset,
                include: [
                    {
                        model: this.userModel,
                        attributes: ['id', 'username'],
                    },
                    this.courseModel,
                    semester_entity_1.Semester,
                ],
            });
            if (!rows.length) {
                throw new common_1.NotFoundException('Grades not found');
            }
            const totalPages = Math.ceil(count / limit);
            const currentPage = Math.ceil(offset / limit) + 1;
            const hasNextPage = currentPage < totalPages;
            const hasPreviousPage = currentPage > 1;
            const pagination = {
                totalItems: count,
                itemsPerPage: limit,
                currentPage: currentPage,
                totalPages: totalPages,
                hasNextPage: hasNextPage,
                hasPreviousPage: hasPreviousPage,
                nextPage: hasNextPage ? currentPage + 1 : null,
                previousPage: hasPreviousPage ? currentPage - 1 : null,
            };
            return { grades: rows, pagination };
        });
    }
    getGradeById(gradeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const grade = yield this.gradeModel.findByPk(gradeId, {
                nest: true,
                raw: true,
                include: [
                    {
                        model: user_entity_1.User,
                        attributes: ['id', 'username'],
                    },
                    {
                        model: this.courseModel,
                    },
                    {
                        model: semester_entity_1.Semester,
                    },
                ],
            });
            if (!grade) {
                throw new common_1.NotFoundException('Grade not found');
            }
            return grade;
        });
    }
    getGradesByStudent(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield this.userModel.findByPk(studentId);
            if (!student || student.role !== 'Student') {
                throw new common_1.NotFoundException('Student not found');
            }
            const grades = yield this.gradeModel.findAll({
                where: { studentId },
                nest: true,
                raw: true,
                include: [
                    {
                        model: user_entity_1.User,
                        attributes: ['id', 'username'],
                    },
                    {
                        model: this.courseModel,
                    },
                    {
                        model: semester_entity_1.Semester,
                    },
                ],
            });
            if (!grades.length) {
                throw new common_1.NotFoundException('Grades not found');
            }
            return grades;
        });
    }
    getGradesByStudentAndSemester(studentId, semesterId) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const grades = yield this.gradeModel.findAll({
                where: { studentId, semesterId },
                nest: true,
                raw: true,
                include: [
                    {
                        model: this.userModel,
                        attributes: ['id', 'username'],
                    },
                    {
                        model: this.courseModel,
                    },
                    {
                        model: semester_entity_1.Semester,
                    },
                ],
            });
            if (!grades.length) {
                throw new common_1.NotFoundException('Grades not found');
            }
            return grades;
        });
    }
    getGradesByCourse(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield this.courseModel.findByPk(courseId);
            if (!course) {
                throw new common_1.NotFoundException('Course not found');
            }
            const grades = yield this.gradeModel.findAll({
                where: { courseId },
                nest: true,
                raw: true,
                include: [
                    {
                        model: this.userModel,
                        attributes: ['id', 'username'],
                    },
                    {
                        model: this.courseModel,
                    },
                    {
                        model: this.semesterModel,
                    },
                ],
            });
            if (!grades.length) {
                throw new common_1.NotFoundException('Grades not found');
            }
            return grades;
        });
    }
    getGradesBySemester(semesterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const semester = yield this.semesterModel.findByPk(semesterId);
            if (!semester) {
                throw new common_1.NotFoundException('Semester not found');
            }
            const grades = yield this.gradeModel.findAll({
                where: { semesterId },
                nest: true,
                raw: true,
                include: [
                    {
                        model: this.userModel,
                        attributes: ['id', 'username'],
                    },
                    {
                        model: this.courseModel,
                    },
                    {
                        model: this.semesterModel,
                    },
                ],
            });
            if (!grades.length) {
                throw new common_1.NotFoundException('Grades not found');
            }
            return grades;
        });
    }
    getGradesByProfessor(professorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const professor = yield this.userModel.findByPk(professorId);
            if (!professor || professor.role !== 'Professor') {
                throw new common_1.NotFoundException('Professor not found');
            }
            const grades = yield this.gradeModel.findAll({
                nest: true,
                raw: true,
                include: [
                    {
                        model: this.userModel,
                        attributes: ['id', 'username'],
                    },
                    {
                        model: this.courseModel,
                    },
                    {
                        model: this.semesterModel,
                    },
                ],
            });
            if (!grades.length) {
                throw new common_1.NotFoundException('Grades not found');
            }
            return grades;
        });
    }
    updateGrade(gradeId, updateGradeDto, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const grade = yield this.gradeModel.findByPk(gradeId);
            if (!grade) {
                throw new common_1.NotFoundException('Grade not found');
            }
            const { studentId, courseId, semesterId } = updateGradeDto;
            const effectiveStudentId = studentId || grade.studentId;
            const effectiveCourseId = courseId || grade.courseId;
            const [student, course, semester, isTheStudentInTheCourse] = yield Promise.all([
                this.userModel.findByPk(effectiveStudentId),
                effectiveCourseId ? this.courseModel.findByPk(effectiveCourseId) : null,
                semesterId ? this.semesterModel.findByPk(semesterId) : null,
                this.studentCourseModel.findOne({
                    where: { studentId: effectiveStudentId, courseId: effectiveCourseId },
                }),
            ]);
            if ((user === null || user === void 0 ? void 0 : user.role) === 'Professor' && effectiveCourseId) {
                const isTheProTeachingThisCourse = yield professor_course_entity_1.ProfessorCourse.findOne({
                    where: { professorId: user.id, courseId: effectiveCourseId },
                });
                if (!isTheProTeachingThisCourse) {
                    throw new common_1.BadRequestException('Professor is not teaching this course');
                }
            }
            if (!student || student.role !== 'Student') {
                throw new common_1.NotFoundException('Student not found');
            }
            if (effectiveCourseId && !course) {
                throw new common_1.NotFoundException('Course not found');
            }
            if (semesterId && !semester) {
                throw new common_1.NotFoundException('Semester not found');
            }
            if (!isTheStudentInTheCourse) {
                throw new common_1.BadRequestException('Student is not enrolled in the course');
            }
            yield grade.update(updateGradeDto);
            return grade;
        });
    }
    deleteGrade(gradeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const grade = yield this.gradeModel.findByPk(gradeId);
            if (!grade) {
                throw new common_1.NotFoundException('Grade not found');
            }
            yield grade.destroy();
        });
    }
};
exports.GradeService = GradeService;
exports.GradeService = GradeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(grade_entity_1.Grade)),
    __param(1, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __param(2, (0, sequelize_1.InjectModel)(semester_entity_1.Semester)),
    __param(3, (0, sequelize_1.InjectModel)(course_entity_1.Course)),
    __param(4, (0, sequelize_1.InjectModel)(student_course_entity_1.StudentCourse)),
    __param(5, (0, sequelize_1.InjectModel)(professor_course_entity_1.ProfessorCourse)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
], GradeService);
//# sourceMappingURL=grade.service.js.map