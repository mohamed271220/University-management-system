import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../config/database';

class CourseCache extends Model<InferAttributes<CourseCache>, InferCreationAttributes<CourseCache>> {
  declare courseId: string;
  declare courseName?: string;
  declare departmentName?: string;
  declare professorName?: string;
  declare cachedAt?: Date;
}

CourseCache.init({
  courseId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'courses',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  courseName: {
    type: DataTypes.STRING
  },
  departmentName: {
    type: DataTypes.STRING
  },
  professorName: {
    type: DataTypes.STRING
  },
  cachedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'CourseCache',
  tableName: 'course_cache',
  timestamps: false
});

export default CourseCache;
