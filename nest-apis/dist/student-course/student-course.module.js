"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentCourseModule = void 0;
const common_1 = require("@nestjs/common");
const student_course_service_1 = require("./student-course.service");
const student_course_controller_1 = require("./student-course.controller");
const auth_module_1 = require("../auth/auth.module");
const student_course_entity_1 = require("./student-course.entity");
const user_entity_1 = require("../user/user.entity");
const course_entity_1 = require("../course/course.entity");
const sequelize_1 = require("@nestjs/sequelize");
const semester_entity_1 = require("../semester/semester.entity");
let StudentCourseModule = class StudentCourseModule {
};
exports.StudentCourseModule = StudentCourseModule;
exports.StudentCourseModule = StudentCourseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            sequelize_1.SequelizeModule.forFeature([student_course_entity_1.StudentCourse, user_entity_1.User, course_entity_1.Course, semester_entity_1.Semester]),
        ],
        providers: [student_course_service_1.StudentCourseService],
        controllers: [student_course_controller_1.StudentCourseController],
    })
], StudentCourseModule);
//# sourceMappingURL=student-course.module.js.map