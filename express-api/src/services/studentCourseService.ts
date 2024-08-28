import Course from "../models/Course";
import Semester from "../models/Semester";
import StudentCourse from "../models/StudentCourses";
import User from "../models/User";
import { CustomError } from "../utils/CustomError";

export class StudentCourseService {
  constructor(private studentCourseModel: typeof StudentCourse) {}

  async enrollCourses(
    studentId: string,
    courses: string[],
    semesterId: string
  ) {
    // const student = await User.findByPk(studentId);
    // const semester = await Semester.findByPk(semesterId);
    const [student, semester] = await Promise.all([
      User.findByPk(studentId),
      Semester.findByPk(semesterId),
    ]);

    if (!student || student.role !== "Student") {
      throw new CustomError("Student not found", 404);
    }
    if (!semester) {
      throw new CustomError("Semester not found", 404);
    }

    // Check if the student is already enrolled in any of the courses for the same semester
    const existingEnrollments = await this.studentCourseModel.findAll({
      where: {
        studentId,
        semesterId,
        courseId: courses, // Correctly handles array with 'Op.in'
      },
    });

    if (existingEnrollments.length > 0) {
      throw new CustomError(
        "Student already enrolled in one or more of these courses for this semester. Please update your courses or delete existing enrollments.",
        400
      );
    }

    const studentCourses = await Promise.all(
      courses.map(async (courseId) => {
        const course = await Course.findByPk(courseId);
        if (!course) {
          throw new CustomError(`Course with ID ${courseId} not found`, 404);
        }
        return this.studentCourseModel.create({
          courseId,
          studentId,
          semesterId,
        });
      })
    );

    return studentCourses;
  }

  async getStudentCoursesByStudentId(studentId: string) {
    const student = await User.findByPk(studentId);
    if (!student || student.role !== "Student") {
      throw new CustomError("Student not found", 404);
    }
    const studentCourses = await this.studentCourseModel.findAll({
      where: { studentId },
      include: [
        {
          model: Course,
        },
        {
          model: Semester,
        },
      ],
    });
    return studentCourses;
  }

  async getStudentsByCourseId(courseId: string) {
    const course = await Course.findByPk(courseId);
    if (!course) {
      throw new CustomError("Course not found", 404);
    }
    const courseStudents = await this.studentCourseModel.findAll({
      where: { courseId },
      include: [
        {
          model: User,
          attributes: { exclude: ["passwordHash"] },
        },
        {
          model: Semester,
        },
      ],
    });
    return courseStudents;
  }

  async getStudentCourseById(studentId: string, courseId: string) {
    const [student, course] = await Promise.all([
      User.findByPk(studentId),
      Course.findByPk(courseId),
    ]);

    if (!student || student.role !== "Student") {
      throw new CustomError("Student not found", 404);
    }

    if (!course) {
      throw new CustomError("Course not found", 404);
    }

    const studentCourse = await this.studentCourseModel.findOne({
      where: { studentId, courseId },
      include: [
        {
          attributes: { exclude: ["passwordHash"] },
        },
        {
          model: Semester,
        },
      ],
    });
    return studentCourse;
  }

  async updateStudentCourse(
    studentId: string,
    courseId: string,
    semesterId: string
  ) {
    const [student, course, semester] = await Promise.all([
      User.findByPk(studentId),
      Course.findByPk(courseId),
      Semester.findByPk(semesterId),
    ]);

    if (!student || student.role !== "Student") {
      throw new CustomError("Student not found", 404);
    }

    if (!course) {
      throw new CustomError("Course not found", 404);
    }

    if (!semester) {
      throw new CustomError("Semester not found", 404);
    }

    const studentCourse = await this.studentCourseModel.findOne({
      where: { studentId, courseId },
    });
    if (!studentCourse) {
      throw new CustomError("Student course not found");
    }
    studentCourse.semesterId = semesterId;
    await studentCourse.save();
    return studentCourse;
  }

  async deleteStudentCourse(studentId: string, courseId: string) {
    const [student, course] = await Promise.all([
      User.findByPk(studentId),
      Course.findByPk(courseId),
    ]);

    if (!student || student.role !== "Student") {
      throw new CustomError("Student not found", 404);
    }

    if (!course) {
      throw new CustomError("Course not found", 404);
    }

    const studentCourse = await this.studentCourseModel.findOne({
      where: { studentId, courseId },
    });
    if (!studentCourse) {
      throw new CustomError("Student course not found");
    }
    await studentCourse.destroy();
    return studentCourse;
  }
}
