import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../config/database";

class Grade extends Model<
  InferAttributes<Grade>,
  InferCreationAttributes<Grade>
> {
  declare id: string;
  declare studentId: string;
  declare courseId: string;
  declare semesterId: string;
  declare grade: string;
  declare date: Date;
  declare description?: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Grade.init(
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
    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "courses",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    semesterId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "semesters",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    grade: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
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
    modelName: "Grade",
    tableName: "grades",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["studentId", "courseId", "semesterId"],
      },
    ],
  }
);

export default Grade;
