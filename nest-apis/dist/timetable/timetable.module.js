"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimetableModule = void 0;
const common_1 = require("@nestjs/common");
const timetable_service_1 = require("./timetable.service");
const timetable_controller_1 = require("./timetable.controller");
const auth_module_1 = require("../auth/auth.module");
const user_entity_1 = require("../user/user.entity");
const course_entity_1 = require("../course/course.entity");
const department_entity_1 = require("../department/department.entity");
const semester_entity_1 = require("../semester/semester.entity");
const hall_entity_1 = require("../hall/hall.entity");
const student_course_entity_1 = require("../student-course/student-course.entity");
const professor_course_entity_1 = require("../professor-course/professor-course.entity");
const sequelize_1 = require("@nestjs/sequelize");
const lecture_entity_1 = require("../lecture/lecture.entity");
const department_year_courses_entity_1 = require("../department-year-courses/department-year-courses.entity");
let TimetableModule = class TimetableModule {
};
exports.TimetableModule = TimetableModule;
exports.TimetableModule = TimetableModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            sequelize_1.SequelizeModule.forFeature([
                user_entity_1.User,
                course_entity_1.Course,
                department_entity_1.Department,
                semester_entity_1.Semester,
                hall_entity_1.Hall,
                student_course_entity_1.StudentCourse,
                professor_course_entity_1.ProfessorCourse,
                lecture_entity_1.Lecture,
                department_year_courses_entity_1.DepartmentYearCourses,
            ]),
        ],
        providers: [timetable_service_1.TimetableService],
        controllers: [timetable_controller_1.TimetableController],
    })
], TimetableModule);
//# sourceMappingURL=timetable.module.js.map