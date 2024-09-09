"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceModule = void 0;
const common_1 = require("@nestjs/common");
const attendance_service_1 = require("./attendance.service");
const attendance_controller_1 = require("./attendance.controller");
const auth_module_1 = require("../auth/auth.module");
const attendance_entity_1 = require("./attendance.entity");
const lecture_entity_1 = require("../lecture/lecture.entity");
const user_entity_1 = require("../user/user.entity");
const student_course_entity_1 = require("../student-course/student-course.entity");
const hall_entity_1 = require("../hall/hall.entity");
const sequelize_1 = require("@nestjs/sequelize");
let AttendanceModule = class AttendanceModule {
};
exports.AttendanceModule = AttendanceModule;
exports.AttendanceModule = AttendanceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            sequelize_1.SequelizeModule.forFeature([
                attendance_entity_1.Attendance,
                lecture_entity_1.Lecture,
                user_entity_1.User,
                student_course_entity_1.StudentCourse,
                hall_entity_1.Hall,
            ]),
        ],
        providers: [attendance_service_1.AttendanceService],
        controllers: [attendance_controller_1.AttendanceController],
    })
], AttendanceModule);
//# sourceMappingURL=attendance.module.js.map