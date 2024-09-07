"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModule = void 0;
const common_1 = require("@nestjs/common");
const course_service_1 = require("./course.service");
const course_controller_1 = require("./course.controller");
const sequelize_1 = require("@nestjs/sequelize");
const course_entity_1 = require("../course/course.entity");
const department_entity_1 = require("../department/department.entity");
const auth_module_1 = require("../auth/auth.module");
const user_entity_1 = require("../user/user.entity");
const lecture_entity_1 = require("../lecture/lecture.entity");
let CourseModule = class CourseModule {
};
exports.CourseModule = CourseModule;
exports.CourseModule = CourseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([course_entity_1.Course, department_entity_1.Department, user_entity_1.User, lecture_entity_1.Lecture]),
            auth_module_1.AuthModule,
        ],
        providers: [course_service_1.CourseService],
        controllers: [course_controller_1.CourseController],
        exports: [course_service_1.CourseService],
    })
], CourseModule);
//# sourceMappingURL=course.module.js.map