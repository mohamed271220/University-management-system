import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../config/database';

class Hall extends Model<InferAttributes<Hall>, InferCreationAttributes<Hall>> {
  declare id: string;
  declare name: string;
  declare isLab: boolean;
  declare departmentId?: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Hall.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isLab: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  departmentId: {
    type: DataTypes.UUID,
    references: {
      model: 'departments',
      key: 'id'
    },
    onDelete: 'SET NULL'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Hall',
  tableName: 'halls',
  timestamps: true
});

export default Hall;
