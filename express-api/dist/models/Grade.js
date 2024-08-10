"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Grade extends sequelize_1.Model {
}
Grade.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    studentId: {
        type: sequelize_1.DataTypes.UUID,
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
    semesterId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "semesters",
            key: "id",
        },
        onDelete: "CASCADE",
    },
    grade: {
        type: sequelize_1.DataTypes.STRING(2),
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: database_1.default,
    modelName: "Grade",
    tableName: "grades",
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ["studentId", "courseId", "semesterId"],
        },
    ],
});
exports.default = Grade;
