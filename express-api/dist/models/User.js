"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    passwordHash: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM("Admin", "Student", "Professor", "Staff"),
        allowNull: false,
    },
    resetPasswordToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // This field can be null
        defaultValue: null,
    },
    resetPasswordExpires: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true, // This field can be null
        defaultValue: null,
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
    modelName: "User",
    tableName: "users",
    timestamps: true,
});
exports.default = User;
