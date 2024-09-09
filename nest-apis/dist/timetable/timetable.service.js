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
exports.TimetableService = exports.Year = void 0;
const common_1 = require("@nestjs/common");
const course_entity_1 = require("../course/course.entity");
const department_entity_1 = require("../department/department.entity");
const hall_entity_1 = require("../hall/hall.entity");
const professor_course_entity_1 = require("../professor-course/professor-course.entity");
const semester_entity_1 = require("../semester/semester.entity");
const student_course_entity_1 = require("../student-course/student-course.entity");
const user_entity_1 = require("../user/user.entity");
const sequelize_1 = require("@nestjs/sequelize");
const lecture_entity_1 = require("../lecture/lecture.entity");
const department_year_courses_entity_1 = require("../department-year-courses/department-year-courses.entity");
var Year;
(function (Year) {
    Year["1st Year"] = "1st Year";
    Year["2nd Year"] = "2nd Year";
    Year["3rd Year"] = "3rd Year";
    Year["4th Year"] = "4th Year";
})(Year || (exports.Year = Year = {}));
let TimetableService = class TimetableService {
    constructor(userModel, courseModel, departmentModel, semesterModel, hallModel, studentCourseModel, professorCourseModel, lectureModel, departmentYearCoursesModel) {
        this.userModel = userModel;
        this.courseModel = courseModel;
        this.departmentModel = departmentModel;
        this.semesterModel = semesterModel;
        this.hallModel = hallModel;
        this.studentCourseModel = studentCourseModel;
        this.professorCourseModel = professorCourseModel;
        this.lectureModel = lectureModel;
        this.departmentYearCoursesModel = departmentYearCoursesModel;
    }
    buildTimetable(lectures) {
        return lectures.map((lecture) => ({
            dayOfWeek: lecture.dayOfWeek,
            startTime: lecture.startTime,
            endTime: lecture.endTime,
            course: lecture.course.name,
            professor: lecture.professor.username,
            hall: lecture.hall.name,
        }));
    }
    getStudentTimetable(studentId, semesterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield this.userModel.findByPk(studentId);
            if (!student || student.role !== 'Student') {
                throw new common_1.NotFoundException('Student not found');
            }
            const courses = yield this.studentCourseModel.findAll({
                where: { studentId, semesterId },
            });
            const lectures = yield this.lectureModel.findAll({
                where: { courseId: courses.map((course) => course.courseId) },
                include: [
                    {
                        model: this.courseModel,
                        as: 'course',
                    },
                    {
                        model: this.userModel,
                        as: 'professor',
                        attributes: { exclude: ['passwordHash'] },
                    },
                    {
                        model: this.hallModel,
                        as: 'hall',
                    },
                ],
            });
            return this.buildTimetable(lectures);
        });
    }
    getProfessorTimetable(professorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const professor = yield this.userModel.findByPk(professorId);
            if (!professor || professor.role !== 'Professor') {
                throw new common_1.NotFoundException('Professor not found');
            }
            const courses = yield professor_course_entity_1.ProfessorCourse.findAll({
                where: { professorId },
            });
            if (!courses.length) {
                throw new common_1.NotFoundException('Professor has no courses assigned');
            }
            const lectures = yield this.lectureModel.findAll({
                where: { courseId: courses.map((c) => c.courseId) },
                include: [
                    {
                        model: this.courseModel,
                        as: 'course',
                    },
                    {
                        model: this.userModel,
                        as: 'professor',
                        attributes: { exclude: ['passwordHash'] },
                    },
                    {
                        model: this.hallModel,
                        as: 'hall',
                    },
                ],
            });
            if (!lectures.length) {
                throw new common_1.NotFoundException('Professor has no lectures assigned');
            }
            return this.buildTimetable(lectures);
        });
    }
    getDepartmentTimetable(departmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            {
                const department = yield this.departmentModel.findByPk(departmentId);
                if (!department) {
                    throw new common_1.NotFoundException('Department not found');
                }
                const courses = yield this.courseModel.findAll({
                    where: { departmentId },
                });
                const lectures = yield this.lectureModel.findAll({
                    where: {
                        courseId: courses.map((course) => course.id),
                    },
                    include: [
                        {
                            model: this.courseModel,
                            as: 'course',
                        },
                        {
                            model: this.userModel,
                            as: 'professor',
                            attributes: { exclude: ['passwordHash'] },
                        },
                        {
                            model: this.hallModel,
                            as: 'hall',
                        },
                    ],
                });
                return this.buildTimetable(lectures);
            }
        });
    }
    getHallTimetable(hallId) {
        return __awaiter(this, void 0, void 0, function* () {
            const hall = yield this.hallModel.findByPk(hallId);
            if (!hall) {
                throw new common_1.NotFoundException('Hall not found');
            }
            const lectures = yield this.lectureModel.findAll({
                where: { hallId },
                include: [
                    {
                        model: this.courseModel,
                        as: 'course',
                    },
                    {
                        model: this.courseModel,
                        as: 'professor',
                        attributes: { exclude: ['passwordHash'] },
                    },
                    {
                        model: this.hallModel,
                        as: 'hall',
                    },
                ],
            });
            return this.buildTimetable(lectures);
        });
    }
    getStudentYearTimetable(departmentId, year) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield this.departmentModel.findByPk(departmentId);
            if (!department) {
                throw new common_1.NotFoundException('Department not found');
            }
            const departmentCourses = yield this.departmentYearCoursesModel.findAll({
                where: { departmentId, year },
                include: [{ model: this.courseModel, as: 'Course' }],
            });
            const lectures = yield this.lectureModel.findAll({
                where: { courseId: departmentCourses.map((dc) => dc.courseId) },
                include: [
                    {
                        model: this.courseModel,
                        as: 'course',
                    },
                    {
                        model: this.userModel,
                        as: 'professor',
                        attributes: { exclude: ['passwordHash'] },
                    },
                    {
                        model: this.hallModel,
                        as: 'hall',
                    },
                ],
            });
            return this.buildTimetable(lectures);
        });
    }
};
exports.TimetableService = TimetableService;
exports.TimetableService = TimetableService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(course_entity_1.Course)),
    __param(2, (0, sequelize_1.InjectModel)(department_entity_1.Department)),
    __param(3, (0, sequelize_1.InjectModel)(semester_entity_1.Semester)),
    __param(4, (0, sequelize_1.InjectModel)(hall_entity_1.Hall)),
    __param(5, (0, sequelize_1.InjectModel)(student_course_entity_1.StudentCourse)),
    __param(6, (0, sequelize_1.InjectModel)(professor_course_entity_1.ProfessorCourse)),
    __param(7, (0, sequelize_1.InjectModel)(lecture_entity_1.Lecture)),
    __param(8, (0, sequelize_1.InjectModel)(department_year_courses_entity_1.DepartmentYearCourses)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object])
], TimetableService);
//# sourceMappingURL=timetable.service.js.map