import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../config/database';

class Profile extends Model<InferAttributes<Profile>, InferCreationAttributes<Profile>> {
  declare id: string;
  declare firstName: string;
  declare lastName: string;
  declare dob?: Date;
  declare contactNumber?: string;
  declare address?: string;
  declare userId: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Profile.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dob: {
    type: DataTypes.DATE
  },
  contactNumber: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.TEXT
  },
  userId: {
    type: DataTypes.UUID,
    unique: true,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Profile',
  tableName: 'profiles',
  timestamps: true
});

export default Profile;
