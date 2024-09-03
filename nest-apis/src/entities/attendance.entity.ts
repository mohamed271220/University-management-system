import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { Lecture } from './lecture.entity';

@Table({
  tableName: 'attendance',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['studentId', 'lectureId'],
    },
  ],
})
export class Attendance extends Model<Attendance> {
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

  @ForeignKey(() => Lecture)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  lectureId: string;

  @Column({
    type: DataType.ENUM('Present', 'Absent', 'Excused'),
    allowNull: false,
  })
  status: 'Present' | 'Absent' | 'Excused';

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  lectureDate: Date;

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

  @BelongsTo(() => User)
  student: User;

  @BelongsTo(() => Lecture)
  lecture: Lecture;
}
