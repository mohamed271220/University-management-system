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
exports.LectureHistory = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const course_entity_1 = require("../course/course.entity");
const user_entity_1 = require("../user/user.entity");
const hall_entity_1 = require("../hall/hall.entity");
const lecture_entity_1 = require("../lecture/lecture.entity");
let LectureHistory = class LectureHistory extends sequelize_typescript_1.Model {
};
exports.LectureHistory = LectureHistory;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], LectureHistory.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => lecture_entity_1.Lecture),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], LectureHistory.prototype, "lectureId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => course_entity_1.Course),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], LectureHistory.prototype, "courseId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_entity_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], LectureHistory.prototype, "professorId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => hall_entity_1.Hall),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], LectureHistory.prototype, "hallId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
    }),
    __metadata("design:type", String)
], LectureHistory.prototype, "dayOfWeek", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TIME,
    }),
    __metadata("design:type", String)
], LectureHistory.prototype, "startTime", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TIME,
    }),
    __metadata("design:type", String)
], LectureHistory.prototype, "endTime", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('Created', 'Updated', 'Deleted', 'Archived'),
        allowNull: false,
    }),
    __metadata("design:type", String)
], LectureHistory.prototype, "action", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", Date)
], LectureHistory.prototype, "timestamp", void 0);
exports.LectureHistory = LectureHistory = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'lecture_history',
        timestamps: false,
    })
], LectureHistory);
//# sourceMappingURL=lecture-history.entity.js.map