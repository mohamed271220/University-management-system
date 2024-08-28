import Grade from "../models/Grade";
import Semester from "../models/Semester";
import { v4 as uuid } from "uuid";
import StudentCourse from "../models/StudentCourses";
import { CustomError } from "../utils/CustomError";

export class SemesterService {
  constructor(private semesterModel: typeof Semester = Semester) {}

  async createSemester(semesterName: string, startDate: Date, endDate: Date) {
    const semester = await this.semesterModel.create({
      id: uuid(),
      name: semesterName,
      startDate,
      endDate,
    });
    return semester;
  }

  async getAllSemesters() {
    const semesters = await this.semesterModel.findAll();
    if (!semesters) {
      throw new CustomError("No semesters found", 404);
    }
    return semesters;
  }

  async getSemesterById(id: string) {
    const semester = await this.semesterModel.findByPk(id);
    if (!semester) {
      throw new CustomError("Semester not found", 404);
    }
    return semester;
  }

  async updateSemester(
    id: string,
    semesterName: string,
    startDate: Date,
    endDate: Date
  ) {
    const semester = await this.semesterModel.findByPk(id);
    if (!semester) {
      throw new CustomError("Semester not found", 404);
    }
    // console.log(semesterName, startDate, endDate);

    if (semesterName !== undefined) {
      semester.name = semesterName;
    }
    if (startDate !== undefined) {
      semester.startDate = startDate;
    }
    if (endDate !== undefined) {
      semester.endDate = endDate;
    }

    await semester.save();
    return semester;
  }

  async deleteSemester(id: string) {
    const semester = await this.semesterModel.findByPk(id);
    if (!semester) {
      throw new CustomError("Semester not found", 404);
    }
    await semester.destroy();
    return semester;
  }

  async getSemesterGrades(semesterId: string) {
    const semester = await Semester.findByPk(semesterId);
    if (!semester) {
      throw new CustomError("Semester not found", 404);
    }
    const grades = await Grade.findAll({
      where: {
        semesterId,
      },
    });
    if (!grades) {
      throw new CustomError("No grades found for this semester", 404);
    }
    return grades;
  }

  async getStudentEnrolledCourses(semesterId: string) {
    const semester = await Semester.findByPk(semesterId);
    if (!semester) {
      throw new CustomError("Semester not found", 404);
    }
    const enrollments = await StudentCourse.findAll({
      where: {
        semesterId,
      },
    });
    if (!enrollments) {
      throw new CustomError(
        "No student enrollments found for this semester",
        404
      );
    }
    return enrollments;
  }
}
