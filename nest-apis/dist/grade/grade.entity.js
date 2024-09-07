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
exports.Grade = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_entity_1 = require("../user/user.entity");
const course_entity_1 = require("../course/course.entity");
const semester_entity_1 = require("../entities/semester.entity");
let Grade = class Grade extends sequelize_typescript_1.Model {
};
exports.Grade = Grade;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Grade.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_entity_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Grade.prototype, "studentId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => course_entity_1.Course),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Grade.prototype, "courseId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => semester_entity_1.Semester),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Grade.prototype, "semesterId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(2),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Grade.prototype, "grade", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
    }),
    __metadata("design:type", Date)
], Grade.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
    }),
    __metadata("design:type", String)
], Grade.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Grade.prototype, "student", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => course_entity_1.Course),
    __metadata("design:type", course_entity_1.Course)
], Grade.prototype, "course", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => semester_entity_1.Semester),
    __metadata("design:type", semester_entity_1.Semester)
], Grade.prototype, "semester", void 0);
exports.Grade = Grade = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'grades',
        timestamps: true,
    })
], Grade);
//# sourceMappingURL=grade.entity.js.map