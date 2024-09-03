import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { Course } from './course.entity';
import { StudentYear } from './student-year.entity';

@Table({
  tableName: 'departments',
  timestamps: true,
})
export class Department extends Model<Department> {
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
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  code: string;

  @HasMany(() => Course)
  courses: Course[];

  @HasMany(() => StudentYear)
  studentYears: StudentYear[];
}
