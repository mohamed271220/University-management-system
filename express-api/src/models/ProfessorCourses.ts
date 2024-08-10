import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../config/database";

class ProfessorCourse extends Model<
  InferAttributes<ProfessorCourse>,
  InferCreationAttributes<ProfessorCourse>
> {
  declare professorId: string;
  declare courseId: string;
}

ProfessorCourse.init(
  {
    professorId: {
      type: DataTypes.UUID,
      primaryKey: true,
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
  },
  {
    sequelize,
    modelName: "ProfessorCourse",
    tableName: "professor_courses",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["professorId", "courseId"],
      },
    ],
  }
);

export default ProfessorCourse;
