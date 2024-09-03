import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { Course } from './course.entity';
import { Semester } from './semester.entity';

@Table({
  tableName: 'grades',
  timestamps: true,
})
export class Grade extends Model<Grade> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

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
    type: DataType.STRING(2),
    allowNull: false,
  })
  grade: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: Date;

  @Column({
    type: DataType.TEXT,
  })
  description?: string;

  @BelongsTo(() => User)
  student: User;

  @BelongsTo(() => Course)
  course: Course;

  @BelongsTo(() => Semester)
  semester: Semester;
}
