"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Hall extends sequelize_1.Model {
}
Hall.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    isLab: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    departmentId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: 'departments',
            key: 'id'
        },
        onDelete: 'SET NULL'
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, {
    sequelize: database_1.default,
    modelName: 'Hall',
    tableName: 'halls',
    timestamps: true
});
exports.default = Hall;
