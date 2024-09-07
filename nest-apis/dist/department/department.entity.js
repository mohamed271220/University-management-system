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
exports.Department = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const course_entity_1 = require("../course/course.entity");
const student_year_entity_1 = require("../student-year/student-year.entity");
const department_year_courses_entity_1 = require("../department-year-courses/department-year-courses.entity");
let Department = class Department extends sequelize_typescript_1.Model {
};
exports.Department = Department;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Department.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Department.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Department.prototype, "code", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => course_entity_1.Course),
    __metadata("design:type", Array)
], Department.prototype, "courses", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => student_year_entity_1.StudentYear),
    __metadata("design:type", Array)
], Department.prototype, "studentYears", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => department_year_courses_entity_1.DepartmentYearCourses),
    __metadata("design:type", Array)
], Department.prototype, "departmentYearCourses", void 0);
exports.Department = Department = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'departments',
        timestamps: true,
    })
], Department);
//# sourceMappingURL=department.entity.js.map