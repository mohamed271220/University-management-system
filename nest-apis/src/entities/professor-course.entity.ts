import {
  Column,
  Model,
  Table,
  ForeignKey,
  Index,
  DataType,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { Course } from './course.entity';

@Table({
  tableName: 'professor_courses',
  timestamps: false,
})
export class ProfessorCourse extends Model<ProfessorCourse> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
  })
  professorId: string;

  @ForeignKey(() => Course)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
  })
  courseId: string;

  @Index({ unique: true })
  static uniqueIndex: void;
}