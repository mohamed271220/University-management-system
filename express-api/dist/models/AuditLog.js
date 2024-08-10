"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class AuditLog extends sequelize_1.Model {
}
AuditLog.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    tableName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    recordId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    action: {
        type: sequelize_1.DataTypes.ENUM('INSERT', 'UPDATE', 'DELETE'),
        allowNull: false
    },
    oldData: {
        type: sequelize_1.DataTypes.JSONB
    },
    newData: {
        type: sequelize_1.DataTypes.JSONB
    },
    changedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    changedBy: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'SET NULL'
    }
}, {
    sequelize: database_1.default,
    modelName: 'AuditLog',
    tableName: 'audit_logs',
    timestamps: false,
    indexes: [
        { fields: ['tableName'] },
        { fields: ['recordId'] }
    ]
});
exports.default = AuditLog;
