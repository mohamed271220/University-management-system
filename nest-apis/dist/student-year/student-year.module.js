"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentYearModule = void 0;
const common_1 = require("@nestjs/common");
const student_year_service_1 = require("./student-year.service");
const student_year_controller_1 = require("./student-year.controller");
const auth_module_1 = require("../auth/auth.module");
const student_year_entity_1 = require("./student-year.entity");
const user_entity_1 = require("../user/user.entity");
const course_entity_1 = require("../course/course.entity");
const department_entity_1 = require("../department/department.entity");
const sequelize_1 = require("@nestjs/sequelize");
let StudentYearModule = class StudentYearModule {
};
exports.StudentYearModule = StudentYearModule;
exports.StudentYearModule = StudentYearModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            sequelize_1.SequelizeModule.forFeature([student_year_entity_1.StudentYear, user_entity_1.User, course_entity_1.Course, department_entity_1.Department]),
        ],
        providers: [student_year_service_1.StudentYearService],
        controllers: [student_year_controller_1.StudentYearController],
    })
], StudentYearModule);
//# sourceMappingURL=student-year.module.js.map