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
exports.Course = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const department_entity_1 = require("../department/department.entity");
const user_entity_1 = require("../user/user.entity");
const lecture_entity_1 = require("../lecture/lecture.entity");
const grade_entity_1 = require("../grade/grade.entity");
const professor_course_entity_1 = require("../entities/professor-course.entity");
const student_course_entity_1 = require("../student-course/student-course.entity");
const department_year_courses_entity_1 = require("../department-year-courses/department-year-courses.entity");
let Course = class Course extends sequelize_typescript_1.Model {
};
exports.Course = Course;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Course.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Course.prototype, "code", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Course.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
    }),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        },
    }),
    __metadata("design:type", Number)
], Course.prototype, "credits", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => department_entity_1.Department),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Course.prototype, "departmentId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_entity_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
    }),
    __metadata("design:type", String)
], Course.prototype, "professorId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => department_entity_1.Department),
    __metadata("design:type", department_entity_1.Department)
], Course.prototype, "department", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_entity_1.User, { as: 'professor' }),
    __metadata("design:type", user_entity_1.User)
], Course.prototype, "professor", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => lecture_entity_1.Lecture),
    __metadata("design:type", Array)
], Course.prototype, "lectures", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => grade_entity_1.Grade),
    __metadata("design:type", Array)
], Course.prototype, "grades", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => user_entity_1.User, () => professor_course_entity_1.ProfessorCourse),
    __metadata("design:type", Array)
], Course.prototype, "professors", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => user_entity_1.User, () => student_course_entity_1.StudentCourse),
    __metadata("design:type", Array)
], Course.prototype, "students", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => department_year_courses_entity_1.DepartmentYearCourses),
    __metadata("design:type", Array)
], Course.prototype, "departmentYearCourses", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", Date)
], Course.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", Date)
], Course.prototype, "updatedAt", void 0);
exports.Course = Course = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'courses',
        timestamps: true,
    })
], Course);
//# sourceMappingURL=course.entity.js.map