import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  PrimaryKey,
} from 'sequelize-typescript';
import { Course } from '../course/course.entity';
import { StudentYear } from '../student-year/student-year.entity';
import { DepartmentYearCourses } from '../department-year-courses/department-year-courses.entity';

@Table({
  tableName: 'departments',
  timestamps: true,
})
export class Department extends Model<Department> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  code: string;

  @HasMany(() => Course)
  courses: Course[];

  @HasMany(() => StudentYear)
  studentYears: StudentYear[];

  @HasMany(() => DepartmentYearCourses)
  departmentYearCourses: DepartmentYearCourses[];
}
