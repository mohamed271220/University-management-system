"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class LectureHistory extends sequelize_1.Model {
}
LectureHistory.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    lectureId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "lectures",
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
    },
    startTime: {
        type: sequelize_1.DataTypes.TIME,
    },
    endTime: {
        type: sequelize_1.DataTypes.TIME,
    },
    action: {
        type: sequelize_1.DataTypes.ENUM("Created", "Updated", "Deleted", "Archived"),
        allowNull: false,
    },
    timestamp: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: database_1.default,
    modelName: "LectureHistory",
    tableName: "lecture_history",
    timestamps: false,
});
exports.default = LectureHistory;
