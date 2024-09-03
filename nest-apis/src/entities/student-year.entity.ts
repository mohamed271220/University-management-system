import { Column, Model, Table, DataType, Index } from 'sequelize-typescript';

@Table({
  tableName: 'student_years',
  timestamps: true,
})
export class StudentYear extends Model<StudentYear> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

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
    type: DataType.ENUM('1st Year', '2nd Year', '3rd Year', '4th Year'),
    allowNull: false,
  })
  year: '1st Year' | '2nd Year' | '3rd Year' | '4th Year';

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  effectiveDate: Date;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    references: {
      model: 'departments',
      key: 'id',
    },
    onDelete: 'CASCADE',
  })
  departmentId: string;

  @Index({ unique: true })
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
}
