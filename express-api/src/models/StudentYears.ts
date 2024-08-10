import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../config/database";

class StudentYear extends Model<
  InferAttributes<StudentYear>,
  InferCreationAttributes<StudentYear>
> {
  declare id: string;
  declare studentId: string;
  declare year: "1st Year" | "2nd Year" | "3rd Year" | "4th Year";
  declare effectiveDate: Date;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

StudentYear.init(
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
    year: {
      type: DataTypes.ENUM("1st Year", "2nd Year", "3rd Year", "4th Year"),
      allowNull: false,
    },
    effectiveDate: {
      type: DataTypes.DATE,
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
    modelName: "StudentYear",
    tableName: "student_years",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["studentId", "effectiveDate"],
      },
      { fields: ["studentId"] },
      { fields: ["year"] },
    ],
  }
);

export default StudentYear;
