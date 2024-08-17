import Course from "../models/Course";
import StudentCourse from "../models/StudentCourses";
import User from "../models/User";

export class StudentCourseService {
  constructor(private studentCourseModel: typeof StudentCourse) {}

  async enrollCourses(
    studentId: string,
    courses: string[],
    semesterId: string
  ) {
    const student = await User.findByPk(studentId);
    if (!student || student.role !== "Student") {
      throw new Error("Student not found");
    }

    const studentCourses = await Promise.all(
      courses.map(async (courseId) => {
        const course = await Course.findByPk(courseId);
        if (!course) {
          throw new Error("Course not found");
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
      throw new Error("Student not found");
    }
    const studentCourses = await this.studentCourseModel.findAll({
      where: { studentId },
      include: [
        {
          model: Course,
        },
      ],
    });
    return studentCourses;
  }

  async getStudentsByCourseId(courseId: string) {
    const courseStudents = await this.studentCourseModel.findAll({
      where: { courseId },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    return courseStudents;
  }

  async getStudentCourseById(studentId: string, courseId: string) {
    const studentCourse = await this.studentCourseModel.findOne({
      where: { studentId, courseId },
      include: [
        {
          model: Course,
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
    const studentCourse = await this.studentCourseModel.findOne({
      where: { studentId, courseId },
    });
    if (!studentCourse) {
      throw new Error("Student course not found");
    }
    studentCourse.semesterId = semesterId;
    await studentCourse.save();
    return studentCourse;
  }

  async deleteStudentCourse(studentId: string, courseId: string) {
    const studentCourse = await this.studentCourseModel.findOne({
      where: { studentId, courseId },
    });
    if (!studentCourse) {
      throw new Error("Student course not found");
    }
    await studentCourse.destroy();
  }
}
