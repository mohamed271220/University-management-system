import { studentYearData } from "../interfaces";
import StudentYear from "../models/StudentYears";
import { v4 as uuid } from "uuid";
import User from "../models/User";

export class StudentYearService {
  constructor(private studentYearModel: typeof StudentYear = StudentYear) {}

  async createStudentYear(data: studentYearData) {
    const { year, studentId, effectiveDate } = data;
    const existingStudentYear = await this.studentYearModel.findOne({
      where: { studentId, effectiveDate },
    });
    if (existingStudentYear) {
      throw new Error("Student year already exists");
    }
    const student = await User.findOne({ where: { id: studentId } });
    if (!student || student.role !== "Student") {
      throw new Error("Student not found");
    }
    const newStudentYear = await this.studentYearModel.create({
      id: uuid(),
      year,
      studentId,
      effectiveDate,
    });
    return newStudentYear;
  }

  async getAllStudentYears() {
    const studentYears = await this.studentYearModel.findAll();
    return studentYears;
  }

  async getYearRecordsByStudent(studentId: string) {
    const studentYears = await this.studentYearModel.findAll({
      where: { studentId },
    });
    if (!studentYears) {
      throw new Error("no student year records not found");
    }
    return studentYears;
  }

  async updateStudentYear(id: string, data: studentYearData) {
    const { year, studentId, effectiveDate } = data;
    const studentYear = await this.studentYearModel.findOne({ where: { id } });
    if (!studentYear) {
      throw new Error("Student year not found");
    }
    if (year !== undefined) studentYear.year = year;
    if (studentId !== undefined) studentYear.studentId = studentId;
    if (effectiveDate !== undefined) studentYear.effectiveDate = effectiveDate;

    await studentYear.save();
    return studentYear;
  }

  async deleteStudentYear(id: string) {
    const studentYear = await this.studentYearModel.findOne({ where: { id } });
    if (!studentYear) {
      throw new Error("Student year not found");
    }
    await studentYear.destroy();
    return studentYear;
  }
}
