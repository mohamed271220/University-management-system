import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../config/database';

class Course extends Model<InferAttributes<Course>, InferCreationAttributes<Course>> {
  declare id: string;
  declare code: string;
  declare name: string;
  declare description?: string;
  declare credits: number;
  declare departmentId: string;
  declare professorId?: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Course.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  credits: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  departmentId: {
    type: DataTypes.UUID,
    allowNull: false,
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
  modelName: 'Course',
  tableName: 'courses',
  timestamps: true
});

export default Course;
