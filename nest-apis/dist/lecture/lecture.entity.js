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
exports.Lecture = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const course_entity_1 = require("../course/course.entity");
const user_entity_1 = require("../user/user.entity");
const hall_entity_1 = require("../hall/hall.entity");
let Lecture = class Lecture extends sequelize_typescript_1.Model {
};
exports.Lecture = Lecture;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Lecture.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => course_entity_1.Course),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Lecture.prototype, "courseId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_entity_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Lecture.prototype, "professorId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => hall_entity_1.Hall),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Lecture.prototype, "hallId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Lecture.prototype, "dayOfWeek", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TIME,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Lecture.prototype, "startTime", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TIME,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Lecture.prototype, "endTime", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
    }),
    __metadata("design:type", String)
], Lecture.prototype, "recurrencePattern", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
    }),
    __metadata("design:type", Date)
], Lecture.prototype, "recurrenceEndDate", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => course_entity_1.Course),
    __metadata("design:type", course_entity_1.Course)
], Lecture.prototype, "course", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Lecture.prototype, "professor", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => hall_entity_1.Hall),
    __metadata("design:type", hall_entity_1.Hall)
], Lecture.prototype, "hall", void 0);
exports.Lecture = Lecture = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'lectures',
        timestamps: true,
    })
], Lecture);
//# sourceMappingURL=lecture.entity.js.map