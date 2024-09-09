import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Department } from '../department/department.entity';

@Table({
  tableName: 'halls',
  timestamps: true,
})
export class Hall extends Model<Hall> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isLab: boolean;

  @ForeignKey(() => Department)
  @Column({
    type: DataType.UUID,
    allowNull: true, // Optional field
  })
  departmentId?: string;

  @BelongsTo(() => Department)
  department: Department;
}
