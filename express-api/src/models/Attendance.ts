import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../config/database";

class Attendance extends Model<
  InferAttributes<Attendance>,
  InferCreationAttributes<Attendance>
> {
  declare id: string;
  declare studentId: string;
  declare lectureId: string;
  declare status: "Present" | "Absent" | "Excused";
  declare lectureDate: Date;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Attendance.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    lectureId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "lectures",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    lectureDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM("Present", "Absent", "Excused"),
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
    modelName: "Attendance",
    tableName: "attendance",
    timestamps: true,
  }
);

export default Attendance;
