import { LectureWithRelations, Year } from "../interfaces";
import Course from "../models/Course";
import Department from "../models/Department";
import DepartmentYearCourses from "../models/DepartmentYearCourses";
import Hall from "../models/Hall";
import Lecture from "../models/Lecture";
import ProfessorCourse from "../models/ProfessorCourses";
import StudentCourse from "../models/StudentCourses";
import User from "../models/User";

export class TimetableService {
  async getStudentTimetable(
    studentId: string,
    semesterId: string
  ): Promise<any> {
    const student = await User.findByPk(studentId);

    if (!student || student.role !== "Student") {
      throw new Error("Student not found");
    }

    const courses = await StudentCourse.findAll({
      where: { studentId, semesterId },
    }); // get all courses that the student is enrolled in for certain semester

    const lectures = await Lecture.findAll({
      where: { courseId: courses.map((course) => course.courseId) },
      include: [
        {
          model: Course,
          as: "course",
        },
        {
          model: User,
          as: "professor",
          attributes: { exclude: ["passwordHash"] },
        },
        {
          model: Hall,
          as: "hall",
        },
      ],
    }); // get all lectures for the courses

    return this.buildTimetable(lectures as LectureWithRelations[]);
  }

  async getProfessorTimetable(professorId: string): Promise<any> {
    const professor = await User.findByPk(professorId);
    if (!professor || professor.role !== "Professor") {
      throw new Error("Professor not found");
    }
    const courses = await ProfessorCourse.findAll({
      where: { professorId },
    });

    if (!courses.length) {
      throw new Error("Professor has no courses assigned");
    }

    const lectures = await Lecture.findAll({
      where: { courseId: courses.map((c) => c.courseId) },
      include: [
        {
          model: Course,
          as: "course",
        },
        {
          model: User,
          as: "professor",
          attributes: { exclude: ["passwordHash"] },
        },
        {
          model: Hall,
          as: "hall",
        },
      ],
    });

    if (!lectures.length) {
      throw new Error("Professor has no lectures assigned");
    }

    return this.buildTimetable(lectures as LectureWithRelations[]);
  }

  async getDepartmentTimetable(departmentId: string) {
    const department = await Department.findByPk(departmentId);
    if (!department) {
      throw new Error("Department not found");
    }
    const courses = await Course.findAll({
      where: { departmentId },
    });

    const lectures = await Lecture.findAll({
      where: {
        courseId: courses.map((course) => course.id),
      },
      include: [
        {
          model: Course,
          as: "course",
        },
        {
          model: User,
          as: "professor",
          attributes: { exclude: ["passwordHash"] },
        },
        {
          model: Hall,
          as: "hall",
        },
      ],
    });

    return this.buildTimetable(lectures as LectureWithRelations[]);
  }

  async getHallTimetable(hallId: string): Promise<any> {
    const hall = await Hall.findByPk(hallId);
    if (!hall) {
      throw new Error("Hall not found");
    }
    const lectures = await Lecture.findAll({
      where: { hallId },
      include: [
        {
          model: Course,
          as: "course",
        },
        {
          model: User,
          as: "professor",
          attributes: { exclude: ["passwordHash"] },
        },
        {
          model: Hall,
          as: "hall",
        },
      ],
    }); // get all lectures for the specific hall

    return this.buildTimetable(lectures as LectureWithRelations[]);
  }

  async getDepartmentYearTimetable(departmentId: string, year: Year) {
    const department = await Department.findByPk(departmentId);
    if (!department) {
      throw new Error("Department not found");
    }

    // Get all courses for the department and year
    const departmentCourses = await DepartmentYearCourses.findAll({
      where: { departmentId, year },
      include: [{ model: Course, as: "Course" }],
    });

    // Find all lectures for these courses
    const lectures = await Lecture.findAll({
      where: { courseId: departmentCourses.map((dc) => dc.courseId) },
      include: [
        {
          model: Course,
          as: "course",
        },
        {
          model: User,
          as: "professor",
          attributes: { exclude: ["passwordHash"] },
        },
        {
          model: Hall,
          as: "hall",
        },
      ],
    });

    return this.buildTimetable(lectures as LectureWithRelations[]);
  }

  buildTimetable(lectures: LectureWithRelations[]) {
    // Aggregate and format the lectures into a timetable
    return lectures.map((lecture) => ({
      dayOfWeek: lecture.dayOfWeek,
      startTime: lecture.startTime,
      endTime: lecture.endTime,
      course: lecture.course.name,
      professor: lecture.professor.username,
      hall: lecture.hall.name,
    }));
  }
}
