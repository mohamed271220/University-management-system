"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterModule = void 0;
const common_1 = require("@nestjs/common");
const semester_service_1 = require("./semester.service");
const semester_controller_1 = require("./semester.controller");
const auth_module_1 = require("../auth/auth.module");
const semester_entity_1 = require("./semester.entity");
const course_entity_1 = require("../course/course.entity");
const grade_entity_1 = require("../grade/grade.entity");
const user_entity_1 = require("../user/user.entity");
const student_course_entity_1 = require("../student-course/student-course.entity");
const sequelize_1 = require("@nestjs/sequelize");
let SemesterModule = class SemesterModule {
};
exports.SemesterModule = SemesterModule;
exports.SemesterModule = SemesterModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([semester_entity_1.Semester, course_entity_1.Course, grade_entity_1.Grade, user_entity_1.User, student_course_entity_1.StudentCourse]),
            auth_module_1.AuthModule,
        ],
        providers: [semester_service_1.SemesterService],
        controllers: [semester_controller_1.SemesterController],
    })
], SemesterModule);
//# sourceMappingURL=semester.module.js.map