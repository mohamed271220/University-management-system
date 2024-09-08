"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const course_cache_module_1 = require("./course-cache/course-cache.module");
const course_cache_entity_1 = require("./course-cache/course-cache.entity");
const user_entity_1 = require("./user/user.entity");
const profile_entity_1 = require("./profile/profile.entity");
const attendance_entity_1 = require("./attendance/attendance.entity");
const grade_entity_1 = require("./grade/grade.entity");
const professor_course_entity_1 = require("./professor-course/professor-course.entity");
const student_course_entity_1 = require("./student-course/student-course.entity");
const student_year_entity_1 = require("./student-year/student-year.entity");
const lecture_entity_1 = require("./lecture/lecture.entity");
const semester_entity_1 = require("./semester/semester.entity");
const lecture_history_entity_1 = require("./lecture-history/lecture-history.entity");
const department_entity_1 = require("./department/department.entity");
const department_year_courses_entity_1 = require("./department-year-courses/department-year-courses.entity");
const hall_entity_1 = require("./hall/hall.entity");
const audit_log_entity_1 = require("./audit-log/audit-log.entity");
const course_entity_1 = require("./course/course.entity");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const config_1 = require("@nestjs/config");
const config_schema_1 = require("./config.schema");
const timetable_module_1 = require("./timetable/timetable.module");
const student_year_module_1 = require("./student-year/student-year.module");
const student_course_module_1 = require("./student-course/student-course.module");
const professor_course_module_1 = require("./professor-course/professor-course.module");
const hall_module_1 = require("./hall/hall.module");
const grade_module_1 = require("./grade/grade.module");
const department_year_courses_module_1 = require("./department-year-courses/department-year-courses.module");
const lecture_module_1 = require("./lecture/lecture.module");
const department_module_1 = require("./department/department.module");
const course_module_1 = require("./course/course.module");
const profile_module_1 = require("./profile/profile.module");
const semester_module_1 = require("./semester/semester.module");
const attendance_module_1 = require("./attendance/attendance.module");
const audit_log_module_1 = require("./audit-log/audit-log.module");
const lecture_history_module_1 = require("./lecture-history/lecture-history.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: [`.env.stage.${process.env.STAGE}`],
                validationSchema: config_schema_1.configValidationSchema,
            }),
            sequelize_1.SequelizeModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => __awaiter(void 0, void 0, void 0, function* () {
                    const isProduction = configService.get('STAGE') === 'prod';
                    return {
                        dialect: 'postgres',
                        host: configService.get('DB_HOST'),
                        port: Number(configService.get('DB_PORT')),
                        username: configService.get('DB_USERNAME'),
                        password: configService.get('DB_PWD'),
                        database: configService.get('DB_NAME'),
                        models: [
                            user_entity_1.User,
                            course_cache_entity_1.CourseCache,
                            profile_entity_1.Profile,
                            attendance_entity_1.Attendance,
                            grade_entity_1.Grade,
                            professor_course_entity_1.ProfessorCourse,
                            student_course_entity_1.StudentCourse,
                            student_year_entity_1.StudentYear,
                            lecture_entity_1.Lecture,
                            semester_entity_1.Semester,
                            lecture_history_entity_1.LectureHistory,
                            department_entity_1.Department,
                            department_year_courses_entity_1.DepartmentYearCourses,
                            hall_entity_1.Hall,
                            audit_log_entity_1.AuditLog,
                            course_entity_1.Course,
                        ],
                        logging: console.log,
                        dialectOptions: isProduction
                            ? {
                                ssl: {
                                    require: true,
                                    rejectUnauthorized: false,
                                },
                            }
                            : {},
                        synchronize: true,
                    };
                }),
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            course_cache_module_1.CourseCacheModule,
            user_module_1.UserModule,
            profile_module_1.ProfileModule,
            course_module_1.CourseModule,
            department_module_1.DepartmentModule,
            lecture_module_1.LectureModule,
            department_year_courses_module_1.DepartmentYearCoursesModule,
            grade_module_1.GradeModule,
            hall_module_1.HallModule,
            professor_course_module_1.ProfessorCourseModule,
            student_course_module_1.StudentCourseModule,
            student_year_module_1.StudentYearModule,
            timetable_module_1.TimetableModule,
            semester_module_1.SemesterModule,
            attendance_module_1.AttendanceModule,
            audit_log_module_1.AuditLogModule,
            lecture_history_module_1.LectureHistoryModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map