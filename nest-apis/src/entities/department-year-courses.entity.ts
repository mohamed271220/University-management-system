import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Department } from './department.entity';
import { Course } from './course.entity';

@Table({
  tableName: 'department_year_courses',
  timestamps: false,
})
export class DepartmentYearCourses extends Model<DepartmentYearCourses> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => Department)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  departmentId: string;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  courseId: string;

  @Column({
    type: DataType.ENUM('1st Year', '2nd Year', '3rd Year', '4th Year'),
    allowNull: false,
  })
  year: '1st Year' | '2nd Year' | '3rd Year' | '4th Year';

  @BelongsTo(() => Department)
  department: Department;

  @BelongsTo(() => Course)
  course: Course;
}
