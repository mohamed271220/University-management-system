"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class ProfessorCourse extends sequelize_1.Model {
}
ProfessorCourse.init({
    professorId: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
        onDelete: "CASCADE",
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
    modelName: "ProfessorCourse",
    tableName: "professor_courses",
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ["professorId", "courseId"],
        },
    ],
});
exports.default = ProfessorCourse;
