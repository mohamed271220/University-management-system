import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../user/user.entity';

@Table({
  tableName: 'profiles',
  timestamps: true,
})
export class Profile extends Model<Profile> {
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
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.DATE,
  })
  dob?: Date;

  @Column({
    type: DataType.STRING,
  })
  contactNumber?: string;

  @Column({
    type: DataType.TEXT,
  })
  address?: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    unique: true,
    allowNull: false,
    onDelete: 'CASCADE',
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;

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

  // Virtual field for full name
  @Column({
    type: DataType.VIRTUAL,
    get() {
      return `${this.getDataValue('firstName')} ${this.getDataValue('lastName')}`;
    },
  })
  fullName: string;
}
