"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentYearCoursesModule = void 0;
const common_1 = require("@nestjs/common");
const department_year_courses_service_1 = require("./department-year-courses.service");
const department_year_courses_controller_1 = require("./department-year-courses.controller");
const department_entity_1 = require("../department/department.entity");
const course_entity_1 = require("../course/course.entity");
const department_year_courses_entity_1 = require("./department-year-courses.entity");
const sequelize_1 = require("@nestjs/sequelize");
const auth_module_1 = require("../auth/auth.module");
let DepartmentYearCoursesModule = class DepartmentYearCoursesModule {
};
exports.DepartmentYearCoursesModule = DepartmentYearCoursesModule;
exports.DepartmentYearCoursesModule = DepartmentYearCoursesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([department_entity_1.Department, course_entity_1.Course, department_year_courses_entity_1.DepartmentYearCourses]),
            auth_module_1.AuthModule,
        ],
        providers: [department_year_courses_service_1.DepartmentYearCoursesService],
        controllers: [department_year_courses_controller_1.DepartmentYearCoursesController],
    })
], DepartmentYearCoursesModule);
//# sourceMappingURL=department-year-courses.module.js.map