"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessorCourseModule = void 0;
const common_1 = require("@nestjs/common");
const professor_course_service_1 = require("./professor-course.service");
const professor_course_controller_1 = require("./professor-course.controller");
const professor_course_entity_1 = require("./professor-course.entity");
const user_entity_1 = require("../user/user.entity");
const course_entity_1 = require("../course/course.entity");
const auth_module_1 = require("../auth/auth.module");
const sequelize_1 = require("@nestjs/sequelize");
let ProfessorCourseModule = class ProfessorCourseModule {
};
exports.ProfessorCourseModule = ProfessorCourseModule;
exports.ProfessorCourseModule = ProfessorCourseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([professor_course_entity_1.ProfessorCourse, user_entity_1.User, course_entity_1.Course]),
            auth_module_1.AuthModule,
        ],
        providers: [professor_course_service_1.ProfessorCourseService],
        controllers: [professor_course_controller_1.ProfessorCourseController],
    })
], ProfessorCourseModule);
//# sourceMappingURL=professor-course.module.js.map