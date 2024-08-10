import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../config/database';

class Lecture extends Model<InferAttributes<Lecture>, InferCreationAttributes<Lecture>> {
  declare id: string;
  declare courseId: string;
  declare professorId: string;
  declare hallId: string;
  declare dayOfWeek: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  declare startTime: string;
  declare endTime: string;
  declare recurrencePattern?: string;
  declare recurrenceEndDate?: Date;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Lecture.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  courseId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'courses',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  professorId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'SET NULL'
  },
  hallId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'halls',
      key: 'id'
    },
    onDelete: 'SET NULL'
  },
  dayOfWeek: {
    type: DataTypes.ENUM('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
    allowNull: false
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  recurrencePattern: {
    type: DataTypes.TEXT
  },
  recurrenceEndDate: {
    type: DataTypes.DATE
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
  modelName: 'Lecture',
  tableName: 'lectures',
  timestamps: true,
  indexes: [
    { fields: ['professorId'] },
    { fields: ['hallId'] },
    { fields: ['courseId'] }
  ]
});

export default Lecture;
