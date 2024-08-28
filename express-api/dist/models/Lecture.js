"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Lecture extends sequelize_1.Model {
}
Lecture.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
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
    professorId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
        onDelete: "SET NULL",
    },
    hallId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "halls",
            key: "id",
        },
        onDelete: "SET NULL",
    },
    dayOfWeek: {
        type: sequelize_1.DataTypes.ENUM("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"),
        allowNull: false,
    },
    startTime: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false,
    },
    endTime: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false,
    },
    recurrencePattern: {
        type: sequelize_1.DataTypes.TEXT,
    },
    recurrenceEndDate: {
        type: sequelize_1.DataTypes.DATE,
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
    modelName: "Lecture",
    tableName: "lectures",
    timestamps: true,
    indexes: [
        { fields: ["professorId"] },
        { fields: ["hallId"] },
        { fields: ["courseId"] },
    ],
});
exports.default = Lecture;
