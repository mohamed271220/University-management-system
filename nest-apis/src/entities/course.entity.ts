import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Department } from './department.entity';
import { User } from './user.entity';
import { Lecture } from './lecture.entity';
import { Grade } from './grade.entity';
import { ProfessorCourse } from './professor-course.entity';
import { StudentCourse } from './student-course.entity';
import { DepartmentYearCourses } from './department-year-courses.entity';

@Table({
  tableName: 'courses',
  timestamps: true,
})
export class Course extends Model<Course> {
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
    onDelete: 'SET NULL',
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
