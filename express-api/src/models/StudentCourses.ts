import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../config/database";

class StudentCourse extends Model<
  InferAttributes<StudentCourse>,
  InferCreationAttributes<StudentCourse>
> {
  declare studentId: string;
  declare courseId: string;
  declare semesterId: string;
  declare enrollmentDate?: Date;
}

StudentCourse.init(
  {
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
    enrollmentDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "StudentCourse",
    tableName: "student_courses",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["studentId", "courseId", "semesterId"],
      },
    ],
  }
);

export default StudentCourse;
