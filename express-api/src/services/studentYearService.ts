import { studentYearData } from "../interfaces";
import StudentYear from "../models/StudentYears";
import { v4 as uuid } from "uuid";
import User from "../models/User";
import { CustomError } from "../utils/CustomError";

export class StudentYearService {
  constructor(private studentYearModel: typeof StudentYear = StudentYear) {}

  async createStudentYear(data: studentYearData) {
    const { year, studentId, effectiveDate, departmentId } = data;
    const [existingStudentYear, student] = await Promise.all([
      this.studentYearModel.findOne({
        where: { studentId, effectiveDate },
      }),
      User.findOne({ where: { id: studentId } }),
    ]);
    // const existingStudentYear = await this.studentYearModel.findOne({
    //   where: { studentId, effectiveDate },
    // });
    if (existingStudentYear) {
      throw new CustomError("Student year already exists", 400);
    }
    // const student = await User.findOne({ where: { id: studentId } });
    if (!student || student.role !== "Student") {
      throw new CustomError("Student not found", 404);
    }
    const newStudentYear = await this.studentYearModel.create({
      id: uuid(),
      year,
      studentId,
      departmentId,
      effectiveDate,
    });
    return newStudentYear;
  }

  async getAllStudentYears() {
    const studentYears = await this.studentYearModel.findAll();
    return studentYears;
  }

  async getYearRecordsByStudent(studentId: string) {
    const student = await User.findByPk(studentId);
    if (!student || student.role !== "Student") {
      throw new CustomError("Student not found", 404);
    }
    const studentYears = await this.studentYearModel.findAll({
      where: { studentId },
    });
    if (!studentYears) {
      throw new CustomError("no student year records not found", 404);
    }
    return studentYears;
  }

  async updateStudentYear(id: string, data: studentYearData) {
    const { year, studentId, effectiveDate, departmentId } = data;
    const studentYear = await this.studentYearModel.findOne({ where: { id } });
    if (!studentYear) {
      throw new CustomError("Student year not found", 404);
    }
    if (year !== undefined) studentYear.year = year;
    if (studentId !== undefined) studentYear.studentId = studentId;
    if (effectiveDate !== undefined) studentYear.effectiveDate = effectiveDate;
    if (departmentId !== undefined) studentYear.departmentId = departmentId;
    await studentYear.save();
    return studentYear;
  }

  async deleteStudentYear(id: string) {
    const studentYear = await this.studentYearModel.findOne({ where: { id } });
    if (!studentYear) {
      throw new CustomError("Student year not found", 404);
    }
    await studentYear.destroy();
    return studentYear;
  }
}
