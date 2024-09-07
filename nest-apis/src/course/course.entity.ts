import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
  HasMany,
  BelongsToMany,
  PrimaryKey,
} from 'sequelize-typescript';
import { Department } from '../department/department.entity';
import { User } from '../user/user.entity';
import { Lecture } from '../lecture/lecture.entity';
import { Grade } from '../grade/grade.entity';
import { ProfessorCourse } from '../entities/professor-course.entity';
import { StudentCourse } from '../student-course/student-course.entity';
import { DepartmentYearCourses } from '../department-year-courses/department-year-courses.entity';

@Table({
  tableName: 'courses',
  timestamps: true,
})
export class Course extends Model<Course> {
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
  code: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
  })
  description?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  })
  credits: number;

  @ForeignKey(() => Department)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  departmentId: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  professorId?: string;

  @BelongsTo(() => Department)
  department: Department;

  @BelongsTo(() => User, { as: 'professor' })
  professor: User;

  @HasMany(() => Lecture)
  lectures: Lecture[];

  @HasMany(() => Grade)
  grades: Grade[];

  @BelongsToMany(() => User, () => ProfessorCourse)
  professors: User[];

  @BelongsToMany(() => User, () => StudentCourse)
  students: User[];

  @HasMany(() => DepartmentYearCourses)
  departmentYearCourses: DepartmentYearCourses[];

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt?: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt?: Date;
}
