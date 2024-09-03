import {
  Column,
  DataType,
  Model,
  Table,
  HasOne,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Profile } from './profile.entity';
import { Course } from './course.entity';
import { Lecture } from './lecture.entity';
import { Attendance } from './attendance.entity';
import { Grade } from './grade.entity';
import { ProfessorCourse } from './professor-course.entity';
import { StudentCourse } from './student-course.entity';
import { StudentYear } from './student-year.entity';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<User> {
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
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  passwordHash: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.ENUM('Admin', 'Student', 'Professor', 'Staff'),
    allowNull: false,
  })
  role: 'Admin' | 'Student' | 'Professor' | 'Staff';

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

  // Relationships
  @HasOne(() => Profile)
  profile: Profile;

  @HasMany(() => Course)
  teachingCourses: Course[];

  @HasMany(() => Lecture)
  lectures: Lecture[];

  @HasMany(() => Attendance)
  attendanceRecords: Attendance[];

  @HasMany(() => Grade)
  grades: Grade[];

  @BelongsToMany(() => Course, () => ProfessorCourse)
  professorCourses: Course[];

  @BelongsToMany(() => Course, () => StudentCourse)
  enrolledCourses: Course[];

  @HasMany(() => StudentYear)
  studentYears: StudentYear[];
}
