"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Profile extends sequelize_1.Model {
    // virtual attribute
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
Profile.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    dob: {
        type: sequelize_1.DataTypes.DATE,
    },
    contactNumber: {
        type: sequelize_1.DataTypes.STRING,
    },
    address: {
        type: sequelize_1.DataTypes.TEXT,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        unique: true,
        allowNull: false,
        references: {
            model: "users",
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
    //The VIRTUAL field does not cause a column in the table to exist. In other words, the model above will not have a fullName column. However, it will appear to have it!
    fullName: {
        type: sequelize_1.DataTypes.VIRTUAL,
        get() {
            return `${this.firstName} ${this.lastName}`;
        },
    },
}, {
    sequelize: database_1.default,
    modelName: "Profile",
    tableName: "profiles",
    timestamps: true,
});
exports.default = Profile;
