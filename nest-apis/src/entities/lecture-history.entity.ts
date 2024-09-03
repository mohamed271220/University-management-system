import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
} from 'sequelize-typescript';
import { Course } from './course.entity';
import { User } from './user.entity';
import { Hall } from './hall.entity';
import { Lecture } from './lecture.entity';

@Table({
  tableName: 'lecture_history',
  timestamps: false,
})
export class LectureHistory extends Model<LectureHistory> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => Lecture)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  lectureId: string;

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
  })
  dayOfWeek?:
    | 'Sunday'
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday';

  @Column({
    type: DataType.TIME,
  })
  startTime?: string;

  @Column({
    type: DataType.TIME,
  })
  endTime?: string;

  @Column({
    type: DataType.ENUM('Created', 'Updated', 'Deleted', 'Archived'),
    allowNull: false,
  })
  action: 'Created' | 'Updated' | 'Deleted' | 'Archived';

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  timestamp?: Date;
}
