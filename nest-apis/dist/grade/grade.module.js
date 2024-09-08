"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeModule = void 0;
const common_1 = require("@nestjs/common");
const grade_service_1 = require("./grade.service");
const grade_controller_1 = require("./grade.controller");
const auth_module_1 = require("../auth/auth.module");
const sequelize_1 = require("@nestjs/sequelize");
const grade_entity_1 = require("./grade.entity");
const user_entity_1 = require("../user/user.entity");
const semester_entity_1 = require("../semester/semester.entity");
const course_entity_1 = require("../course/course.entity");
const student_course_entity_1 = require("../student-course/student-course.entity");
const professor_course_entity_1 = require("../professor-course/professor-course.entity");
let GradeModule = class GradeModule {
};
exports.GradeModule = GradeModule;
exports.GradeModule = GradeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([
                grade_entity_1.Grade,
                user_entity_1.User,
                semester_entity_1.Semester,
                course_entity_1.Course,
                student_course_entity_1.StudentCourse,
                professor_course_entity_1.ProfessorCourse,
            ]),
            auth_module_1.AuthModule,
        ],
        providers: [grade_service_1.GradeService],
        controllers: [grade_controller_1.GradeController],
        exports: [grade_service_1.GradeService],
    })
], GradeModule);
//# sourceMappingURL=grade.module.js.map