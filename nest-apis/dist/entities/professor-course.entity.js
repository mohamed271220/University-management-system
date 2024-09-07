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
exports.ProfessorCourse = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_entity_1 = require("../user/user.entity");
const course_entity_1 = require("../course/course.entity");
let ProfessorCourse = class ProfessorCourse extends sequelize_typescript_1.Model {
};
exports.ProfessorCourse = ProfessorCourse;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_entity_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], ProfessorCourse.prototype, "professorId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => course_entity_1.Course),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], ProfessorCourse.prototype, "courseId", void 0);
__decorate([
    (0, sequelize_typescript_1.Index)({ unique: true }),
    __metadata("design:type", void 0)
], ProfessorCourse, "uniqueIndex", void 0);
exports.ProfessorCourse = ProfessorCourse = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'professor_courses',
        timestamps: false,
    })
], ProfessorCourse);
//# sourceMappingURL=professor-course.entity.js.map