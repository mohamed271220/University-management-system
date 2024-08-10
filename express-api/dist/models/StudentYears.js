"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class StudentYear extends sequelize_1.Model {
}
StudentYear.init({
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
    year: {
        type: sequelize_1.DataTypes.ENUM("1st Year", "2nd Year", "3rd Year", "4th Year"),
        allowNull: false,
    },
    effectiveDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
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
    modelName: "StudentYear",
    tableName: "student_years",
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ["studentId", "effectiveDate"],
        },
        { fields: ["studentId"] },
        { fields: ["year"] },
    ],
});
exports.default = StudentYear;
