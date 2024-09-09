import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  Index,
} from 'sequelize-typescript';
import { User } from '../user/user.entity';
import { Course } from '../course/course.entity';
import { Semester } from '../semester/semester.entity';

@Table({
  tableName: 'student_courses',
  timestamps: false,
})
export class StudentCourse extends Model<StudentCourse> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  studentId: string;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  courseId: string;

  @ForeignKey(() => Semester)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  semesterId: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  enrollmentDate?: Date;

  @BelongsTo(() => User)
  student: User;

  @BelongsTo(() => Course)
  course: Course;

  @BelongsTo(() => Semester)
  semester: Semester;

  @Index({ unique: true, name: 'unique_enrollment' })
  static uniqueEnrollmentIndex: void;
}
