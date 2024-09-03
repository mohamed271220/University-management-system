import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Course } from './course.entity';
import { User } from './user.entity';
import { Hall } from './hall.entity';

@Table({
  tableName: 'lectures',
  timestamps: true,
})
export class Lecture extends Model<Lecture> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  courseId: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  professorId: string;

  @ForeignKey(() => Hall)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  hallId: string;

  @Column({
    type: DataType.ENUM(
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ),
    allowNull: false,
  })
  dayOfWeek:
    | 'Sunday'
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday';

  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  startTime: string;

  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  endTime: string;

  @Column({
    type: DataType.TEXT,
  })
  recurrencePattern?: string;

  @Column({
    type: DataType.DATE,
  })
  recurrenceEndDate?: Date;

  @BelongsTo(() => Course)
  course: Course;

  @BelongsTo(() => User)
  professor: User;

  @BelongsTo(() => Hall)
  hall: Hall;
}
