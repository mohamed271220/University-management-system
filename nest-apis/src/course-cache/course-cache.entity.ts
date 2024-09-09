import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'course_cache',
  timestamps: false,
})
export class CourseCache extends Model<CourseCache> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
  })
  courseId: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  courseName?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  departmentName?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  professorName?: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  cachedAt?: Date;
}
