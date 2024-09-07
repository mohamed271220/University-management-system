"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const profile_entity_1 = require("../profile/profile.entity");
const course_entity_1 = require("../course/course.entity");
const lecture_entity_1 = require("../lecture/lecture.entity");
const attendance_entity_1 = require("../entities/attendance.entity");
const grade_entity_1 = require("../grade/grade.entity");
const professor_course_entity_1 = require("../entities/professor-course.entity");
const student_course_entity_1 = require("../student-course/student-course.entity");
const student_year_entity_1 = require("../student-year/student-year.entity");
let User = class User extends sequelize_typescript_1.Model {
};
exports.User = User;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('Admin', 'Student', 'Professor', 'Staff'),
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => profile_entity_1.Profile),
    __metadata("design:type", profile_entity_1.Profile)
], User.prototype, "profile", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => course_entity_1.Course),
    __metadata("design:type", Array)
], User.prototype, "teachingCourses", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => lecture_entity_1.Lecture),
    __metadata("design:type", Array)
], User.prototype, "lectures", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => attendance_entity_1.Attendance),
    __metadata("design:type", Array)
], User.prototype, "attendanceRecords", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => grade_entity_1.Grade),
    __metadata("design:type", Array)
], User.prototype, "grades", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => course_entity_1.Course, () => professor_course_entity_1.ProfessorCourse),
    __metadata("design:type", Array)
], User.prototype, "professorCourses", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => course_entity_1.Course, () => student_course_entity_1.StudentCourse),
    __metadata("design:type", Array)
], User.prototype, "enrolledCourses", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => student_year_entity_1.StudentYear),
    __metadata("design:type", Array)
], User.prototype, "studentYears", void 0);
exports.User = User = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'users',
        timestamps: true,
    })
], User);
//# sourceMappingURL=user.entity.js.map