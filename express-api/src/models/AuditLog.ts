import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../config/database';

class AuditLog extends Model<InferAttributes<AuditLog>, InferCreationAttributes<AuditLog>> {
  declare id: string;
  declare tableName: string;
  declare recordId: string;
  declare action: 'INSERT' | 'UPDATE' | 'DELETE';
  declare oldData?: Record<string, any>;
  declare newData?: Record<string, any>;
  declare changedAt?: Date;
  declare changedBy?: string;
}

AuditLog.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  tableName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  recordId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  action: {
    type: DataTypes.ENUM('INSERT', 'UPDATE', 'DELETE'),
    allowNull: false
  },
  oldData: {
    type: DataTypes.JSONB
  },
  newData: {
    type: DataTypes.JSONB
  },
  changedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  changedBy: {
    type: DataTypes.UUID,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'SET NULL'
  }
}, {
  sequelize,
  modelName: 'AuditLog',
  tableName: 'audit_logs',
  timestamps: false,
  indexes: [
    { fields: ['tableName'] },
    { fields: ['recordId'] }
  ]
});

export default AuditLog;
