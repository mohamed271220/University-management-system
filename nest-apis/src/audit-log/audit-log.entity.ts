import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../user/user.entity';

@Table({
  tableName: 'audit_logs',
  timestamps: false,
  indexes: [{ fields: ['tableName'] }, { fields: ['recordId'] }],
})
export class AuditLog extends Model<AuditLog> {
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
  tableName: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  recordId: string;

  @Column({
    type: DataType.ENUM('INSERT', 'UPDATE', 'DELETE'),
    allowNull: false,
  })
  action: 'INSERT' | 'UPDATE' | 'DELETE';

  @Column({
    type: DataType.JSONB,
  })
  oldData?: Record<string, any>;

  @Column({
    type: DataType.JSONB,
  })
  newData?: Record<string, any>;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  changedAt?: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: true, // Allow nulls if 'changedBy' is optional
  })
  changedBy?: string;

  @BelongsTo(() => User)
  user?: User;
}
