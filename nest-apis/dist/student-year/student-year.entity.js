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
exports.StudentYear = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_entity_1 = require("../user/user.entity");
const department_entity_1 = require("../department/department.entity");
let StudentYear = class StudentYear extends sequelize_typescript_1.Model {
};
exports.StudentYear = StudentYear;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], StudentYear.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_entity_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", String)
], StudentYear.prototype, "studentId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('1st Year', '2nd Year', '3rd Year', '4th Year'),
        allowNull: false,
    }),
    __metadata("design:type", String)
], StudentYear.prototype, "year", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
    }),
    __metadata("design:type", Date)
], StudentYear.prototype, "effectiveDate", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => department_entity_1.Department),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
        references: {
            model: 'departments',
            key: 'id',
        },
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", String)
], StudentYear.prototype, "departmentId", void 0);
__decorate([
    (0, sequelize_typescript_1.Index)({ unique: true }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", Date)
], StudentYear.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", Date)
], StudentYear.prototype, "updatedAt", void 0);
exports.StudentYear = StudentYear = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'student_years',
        timestamps: true,
    })
], StudentYear);
//# sourceMappingURL=student-year.entity.js.map