import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../config/database";

class Department extends Model<
  InferAttributes<Department>,
  InferCreationAttributes<Department>
> {
  declare id: string;
  declare name: string;
  declare code: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Department.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Department",
    tableName: "departments",
    timestamps: true,
  }
);

export default Department;
