import {
  Column,
  DataType,
  Model,
  Table,
  HasOne,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Profile } from '../profile/profile.entity';
import { Course } from '../course/course.entity';
import { Lecture } from '../lecture/lecture.entity';
import { Attendance } from '../attendance/attendance.entity';
import { Grade } from '../grade/grade.entity';
import { ProfessorCourse } from '../professor-course/professor-course.entity';
import { StudentCourse } from '../student-course/student-course.entity';
import { StudentYear } from '../student-year/student-year.entity';

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
