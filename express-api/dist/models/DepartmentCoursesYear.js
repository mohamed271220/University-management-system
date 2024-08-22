"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class DepartmentYearCourses extends sequelize_1.Model {
}
DepartmentYearCourses.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    departmentId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "departments",
            key: "id",
        },
        onDelete: "CASCADE",
    },
    year: {
        type: sequelize_1.DataTypes.ENUM("1st Year", "2nd Year", "3rd Year", "4th Year"),
        allowNull: false,
    },
    courseId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "courses",
            key: "id",
        },
        onDelete: "CASCADE",
    },
}, {
    sequelize: database_1.default,
    modelName: "DepartmentYearCourses",
    tableName: "department_year_courses",
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ["departmentId", "year", "courseId"],
        },
        {
            fields: ["departmentId"],
        },
        {
            fields: ["year"],
        },
    ],
});
exports.default = DepartmentYearCourses;
