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
exports.DepartmentYearCourses = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const department_entity_1 = require("../department/department.entity");
const course_entity_1 = require("../course/course.entity");
let DepartmentYearCourses = class DepartmentYearCourses extends sequelize_typescript_1.Model {
};
exports.DepartmentYearCourses = DepartmentYearCourses;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], DepartmentYearCourses.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => department_entity_1.Department),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], DepartmentYearCourses.prototype, "departmentId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => course_entity_1.Course),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], DepartmentYearCourses.prototype, "courseId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('1st Year', '2nd Year', '3rd Year', '4th Year'),
        allowNull: false,
    }),
    __metadata("design:type", String)
], DepartmentYearCourses.prototype, "year", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => department_entity_1.Department),
    __metadata("design:type", department_entity_1.Department)
], DepartmentYearCourses.prototype, "department", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => course_entity_1.Course),
    __metadata("design:type", course_entity_1.Course)
], DepartmentYearCourses.prototype, "course", void 0);
exports.DepartmentYearCourses = DepartmentYearCourses = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'department_year_courses',
        timestamps: false,
    })
], DepartmentYearCourses);
//# sourceMappingURL=department-year-courses.entity.js.map