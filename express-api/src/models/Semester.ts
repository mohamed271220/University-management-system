import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../config/database';

class Semester extends Model<InferAttributes<Semester>, InferCreationAttributes<Semester>> {
  declare id: string;
  declare name: string;
  declare startDate: Date;
  declare endDate: Date;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Semester.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
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
  modelName: 'Semester',
  tableName: 'semesters',
  timestamps: true,
  indexes: [
    { fields: ['name'] }
  ]
});

export default Semester;
