import { attendanceStatus } from "../interfaces";
import Attendance from "../models/Attendance";
import { v4 as uuid } from "uuid";
import Lecture from "../models/Lecture";
import Hall from "../models/Hall";
import User from "../models/User";
import StudentCourse from "../models/StudentCourses";

export class AttendanceService {
  constructor(private attendanceRepository: typeof Attendance = Attendance) {}

  async createAttendance(
    user: { id: string; role: string },
    studentId: string,
    lectureId: string,
    status: attendanceStatus,
    lectureDate: Date
  ) {
    if (
      user.role !== "professor" &&
      user.role !== "admin" &&
      user.role !== "staff"
    ) {
      throw new Error("You are not authorized to sign students");
    }

    const [student, lecture] = await Promise.all([
      User.findByPk(studentId),
      Lecture.findByPk(lectureId),
    ]);

    if (!student || student.role !== "Student") {
      throw new Error("Invalid student ID");
    }

    if (!lecture) {
      throw new Error("Invalid lecture ID");
    }

    if (user.role === "professor" && user.id !== lecture?.professorId) {
      throw new Error(
        "You are not authorized to sign students for this lecture"
      );
    }

    const isStudentSignedForCourse = await StudentCourse.findOne({
      where: { studentId, courseId: lecture?.courseId },
    });

    if (!isStudentSignedForCourse) {
      throw new Error("Student is not signed for this course");
    }

    const attendanceRecord = await this.attendanceRepository.create({
      id: uuid(),
      studentId,
      lectureId,
      status,
      lectureDate,
    });
    return attendanceRecord;
  }

  async getAllAttendances(limit: number, offset: number) {
    const { count, rows: attendanceRecords } =
      await this.attendanceRepository.findAndCountAll({
        limit,
        offset,
        include: [
          {
            model: Lecture,
            include: [{ model: Hall }],
          },
        ],
      });

    // count the number of departments for pagination
    const totalPages = Math.ceil(count / limit);
    const currentPage = Math.ceil(offset / limit) + 1;
    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;

    const pagination = {
      totalItems: count,
      itemsPerPage: limit,
      currentPage: currentPage,
      totalPages: totalPages,
      hasNextPage: hasNextPage,
      hasPreviousPage: hasPreviousPage,
      nextPage: hasNextPage ? currentPage + 1 : null,
      previousPage: hasPreviousPage ? currentPage - 1 : null,
    };

    return { attendanceRecords, pagination };
  }

  async getAttendanceByStudent(studentId: string) {
    const student = await User.findByPk(studentId);
    if (!student || student.role !== "Student") {
      throw new Error("Student not found");
    }
    const attendanceRecords = await this.attendanceRepository.findAll({
      where: { studentId },
      include: [
        {
          model: Lecture,
          include: [{ model: Hall }],
        },
      ],
    });
    if (!attendanceRecords) throw new Error("Attendance records not found");
    return attendanceRecords;
  }

  async getAttendanceByLecture(lectureId: string) {
    const lecture = await Lecture.findByPk(lectureId);
    if (!lecture) throw new Error("Lecture not found");
    const attendanceRecords = await this.attendanceRepository.findAll({
      where: { lectureId },
      include: [
        {
          model: Lecture,
          include: [{ model: Hall }],
        },
      ],
    });
    if (!attendanceRecords) throw new Error("Attendance records not found");
    return attendanceRecords;
  }

  async getAttendanceByStudentAndLecture(studentId: string, lectureId: string) {
    const attendanceRecord = await this.attendanceRepository.findOne({
      where: { studentId, lectureId },
      include: [
        {
          model: Lecture,
          include: [{ model: Hall }],
        },
      ],
    });
    if (!attendanceRecord) throw new Error("Attendance record not found");
    return attendanceRecord;
  }

  async updateAttendanceStatus(
    attendanceRecordId: string,
    status: attendanceStatus
  ) {
    const attendanceRecord = await this.attendanceRepository.findByPk(
      attendanceRecordId
    );
    if (!attendanceRecord) throw new Error("Attendance record not found");
    attendanceRecord.status = status;
    await attendanceRecord.save();
    return attendanceRecord;
  }

  async deleteAttendance(attendanceRecordId: string) {
    const attendanceRecord = await this.attendanceRepository.findByPk(
      attendanceRecordId
    );
    if (!attendanceRecord) throw new Error("Attendance record not found");
    await attendanceRecord.destroy();
    return { message: "Attendance record deleted" };
  }
}
