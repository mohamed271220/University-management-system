import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../config/database";
import Department from "./Department";
import Course from "./Course";

class DepartmentYearCourses extends Model<
  InferAttributes<DepartmentYearCourses>,
  InferCreationAttributes<DepartmentYearCourses>
> {
  declare id: string;
  declare departmentId: string;
  declare year: "1st Year" | "2nd Year" | "3rd Year" | "4th Year";
  declare courseId: string;
}

DepartmentYearCourses.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    departmentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "departments",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    year: {
      type: DataTypes.ENUM("1st Year", "2nd Year", "3rd Year", "4th Year"),
      allowNull: false,
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
    modelName: "DepartmentYearCourses",
    tableName: "department_year_courses",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["departmentId", "year", "courseId"],
      },
      {
        fields: ["departmentId"],
      },
      {
        fields: ["year"],
      },
    ],
  }
);
export default DepartmentYearCourses;
