import { Column, Model, Table, DataType, Index } from 'sequelize-typescript';

@Table({
  tableName: 'student_courses',
  timestamps: false,
})
export class StudentCourse extends Model<StudentCourse> {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  })
  studentId: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    references: {
      model: 'courses',
      key: 'id',
    },
    onDelete: 'CASCADE',
  })
  courseId: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    references: {
      model: 'semesters',
      key: 'id',
    },
    onDelete: 'CASCADE',
  })
  semesterId: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  enrollmentDate?: Date;

  @Index({ unique: true })
  static uniqueEnrollmentIndex: void;
}
