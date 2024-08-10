import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../config/database";

class Timetable extends Model<
  InferAttributes<Timetable>,
  InferCreationAttributes<Timetable>
> {
  declare id: string;
  declare entityId: string;
  declare entityType: "Student" | "Professor" | "Hall";
  declare lectureId: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Timetable.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    entityId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    entityType: {
      type: DataTypes.ENUM("Student", "Professor", "Hall"),
      allowNull: false,
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
    modelName: "Timetable",
    tableName: "timetables",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["entityId", "entityType", "lectureId"],
      },
    ],
  }
);

export default Timetable;
