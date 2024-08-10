"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Timetable extends sequelize_1.Model {
}
Timetable.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    entityId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    entityType: {
        type: sequelize_1.DataTypes.ENUM("Student", "Professor", "Hall"),
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
    modelName: "Timetable",
    tableName: "timetables",
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ["entityId", "entityType", "lectureId"],
        },
    ],
});
exports.default = Timetable;
