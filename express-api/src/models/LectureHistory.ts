import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../config/database';

class LectureHistory extends Model<InferAttributes<LectureHistory>, InferCreationAttributes<LectureHistory>> {
  declare id: string;
  declare lectureId: string;
  declare courseId: string;
  declare professorId: string;
  declare hallId: string;
  declare dayOfWeek?: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  declare startTime?: string;
  declare endTime?: string;
  declare action: 'Created' | 'Updated' | 'Deleted';
  declare timestamp?: Date;
}

LectureHistory.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  lectureId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'lectures',
      key: 'id'
    },
    onDelete: 'CASCADE'
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
    type: DataTypes.ENUM('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')
  },
  startTime: {
    type: DataTypes.TIME
  },
  endTime: {
    type: DataTypes.TIME
  },
  action: {
    type: DataTypes.ENUM('Created', 'Updated', 'Deleted'),
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'LectureHistory',
  tableName: 'lecture_history',
  timestamps: false
});

export default LectureHistory;
