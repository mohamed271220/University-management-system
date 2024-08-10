"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class CourseCache extends sequelize_1.Model {
}
CourseCache.init({
    courseId: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'courses',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    courseName: {
        type: sequelize_1.DataTypes.STRING
    },
    departmentName: {
        type: sequelize_1.DataTypes.STRING
    },
    professorName: {
        type: sequelize_1.DataTypes.STRING
    },
    cachedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, {
    sequelize: database_1.default,
    modelName: 'CourseCache',
    tableName: 'course_cache',
    timestamps: false
});
exports.default = CourseCache;
