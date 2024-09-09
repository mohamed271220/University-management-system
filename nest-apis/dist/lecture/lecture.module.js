"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LectureModule = void 0;
const common_1 = require("@nestjs/common");
const lecture_service_1 = require("./lecture.service");
const lecture_controller_1 = require("./lecture.controller");
const sequelize_1 = require("@nestjs/sequelize");
const lecture_entity_1 = require("./lecture.entity");
const auth_module_1 = require("../auth/auth.module");
const user_entity_1 = require("../user/user.entity");
const attendance_entity_1 = require("../attendance/attendance.entity");
const lecture_history_entity_1 = require("../lecture-history/lecture-history.entity");
const course_entity_1 = require("../course/course.entity");
const hall_entity_1 = require("../hall/hall.entity");
let LectureModule = class LectureModule {
};
exports.LectureModule = LectureModule;
exports.LectureModule = LectureModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([
                lecture_entity_1.Lecture,
                user_entity_1.User,
                attendance_entity_1.Attendance,
                lecture_history_entity_1.LectureHistory,
                course_entity_1.Course,
                hall_entity_1.Hall,
            ]),
            auth_module_1.AuthModule,
        ],
        providers: [lecture_service_1.LectureService],
        controllers: [lecture_controller_1.LectureController],
        exports: [lecture_service_1.LectureService],
    })
], LectureModule);
//# sourceMappingURL=lecture.module.js.map