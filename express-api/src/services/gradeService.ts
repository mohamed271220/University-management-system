import Grade from "../models/Grade";
import { v4 as uuid } from "uuid";
import User from "../models/User";
import Course from "../models/Course";
import { CustomError } from "../utils/CustomError";
import Semester from "../models/Semester";
import StudentCourse from "../models/StudentCourses";
import { userRequest } from "../interfaces";
import ProfessorCourse from "../models/ProfessorCourses";

export class GradeService {
  constructor(private gradeRepository: typeof Grade = Grade) {}

  async createGrade(
    data: {
      studentId: string;
      courseId: string;
      semesterId: string;
      grade: string;
      date: Date;
      description?: string;
    },
    user: userRequest["user"]
  ) {
    const [
      student,
      course,
      semester,
      isTheStudentInTheCourse,
      // isTheProTeachingThisCourse,
    ] = await Promise.all([
      User.findByPk(data.studentId),
      Course.findByPk(data.courseId),
      Semester.findByPk(data.semesterId),
      StudentCourse.findOne({
        where: { studentId: data.studentId, courseId: data.courseId },
      }),
    ]);
    if (user?.role === "Professor") {
      const isTheProTeachingThisCourse = await ProfessorCourse.findOne({
        where: { professorId: user.id, courseId: data.courseId },
      });
      if (!isTheProTeachingThisCourse) {
        throw new CustomError("Professor is not teaching this course", 400);
      }
    }
    if (!student || student.role !== "Student") {
      throw new CustomError("Student not found", 404);
    }
    if (!course) {
      throw new CustomError("Course not found", 404);
    }
    if (!semester) {
      throw new CustomError("Semester not found", 404);
    }
    if (!isTheStudentInTheCourse) {
      throw new CustomError("Student is not enrolled in the course", 400);
    }
    const grade = await this.gradeRepository.create({ id: uuid(), ...data });
    return grade;
  }

  async getAllGrades(limit: number, offset: number) {
    const { count, rows } = await this.gradeRepository.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
        Course,
        Semester,
      ],
    });
    if (!rows.length) {
      throw new CustomError("Grades not found", 404);
    }
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

    return { grades: rows, pagination };
  }

  async getGradeById(id: string) {
    const grade = await this.gradeRepository.findByPk(id);
    if (!grade) {
      throw new CustomError("Grade not found", 404);
    }
    return grade;
  }

  async getGradesByStudent(studentId: string) {
    const student = await User.findByPk(studentId);
    if (!student || student.role !== "Student") {
      throw new CustomError("Student not found", 404);
    }
    const grades = await this.gradeRepository.findAll({
      where: { studentId },
    });
    return grades;
  }

  async getGradesByStudentAndSemester(studentId: string, semesterId: string) {
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
    const grades = await this.gradeRepository.findAll({
      where: { studentId, semesterId },
    });
    if (!grades.length) {
      throw new CustomError("Grades not found", 404);
    }
    return grades;
  }

  async updateGrade(id: string, updates: Partial<Grade>, user: userRequest["user"]) {
    // Find the existing grade record
    const grade = await this.gradeRepository.findByPk(id);
    if (!grade) {
      throw new CustomError("Grade not found", 404);
    }
  
    // Destructure fields from the updates to check if they exist
    const { studentId, courseId, semesterId } = updates;
  
    // Determine which studentId to validate against
    const effectiveStudentId = studentId || grade.studentId;
  
    // Determine which courseId to validate against
    const effectiveCourseId = courseId || grade.courseId;
  
    // Perform validations only for the fields being updated
    const [
      student,
      course,
      semester,
      isTheStudentInTheCourse,
    ] = await Promise.all([
      User.findByPk(effectiveStudentId),
      effectiveCourseId ? Course.findByPk(effectiveCourseId) : null,
      semesterId ? Semester.findByPk(semesterId) : null,
      StudentCourse.findOne({
        where: { studentId: effectiveStudentId, courseId: effectiveCourseId },
      }),
    ]);
  
    // Professor validation only if courseId is being updated
    if (user?.role === "Professor" && effectiveCourseId) {
      const isTheProTeachingThisCourse = await ProfessorCourse.findOne({
        where: { professorId: user.id, courseId: effectiveCourseId },
      });
      if (!isTheProTeachingThisCourse) {
        throw new CustomError("Professor is not teaching this course", 400);
      }
    }
  
    // Validate student, course, semester, and enrollment
    if (!student || student.role !== "Student") {
      throw new CustomError("Student not found", 404);
    }
    if (effectiveCourseId && !course) {
      throw new CustomError("Course not found", 404);
    }
    if (semesterId && !semester) {
      throw new CustomError("Semester not found", 404);
    }
    if (!isTheStudentInTheCourse) {
      throw new CustomError("Student is not enrolled in the course", 400);
    }
  
    // Update the grade record with the valid updates
    await grade.update(updates);
    return grade;
  }
  

  async deleteGrade(id: string) {
    const grade = await this.gradeRepository.findByPk(id);
    if (!grade) {
      throw new CustomError("Grade not found", 404);
    }
    await grade.destroy();
  }

  async getGradesByCourse(courseId: string) {
    const course = await Course.findByPk(courseId);
    if (!course) {
      throw new CustomError("Course not found", 404);
    }
    const grades = await this.gradeRepository.findAll({
      where: { courseId },
    });
    return grades;
  }

  async getGradesBySemester(semesterId: string) {
    const semester = await Semester.findByPk(semesterId);
    if (!semester) {
      throw new CustomError("Semester not found", 404);
    }
    const grades = await this.gradeRepository.findAll({
      where: { semesterId },
    });
    return grades;
  }

  async getGradesByProfessor(professorId: string) {
    const professor = await User.findByPk(professorId);
    if (!professor || professor.role !== "Professor") {
      throw new CustomError("Professor not found", 404);
    }
    const courses = await Course.findAll({
      where: { professorId },
    });
    if (!courses) {
      throw new CustomError("Professor has no courses", 404);
    }
    const grades = await this.gradeRepository.findAll({
      where: { courseId: courses.map((course) => course.id) },
    });

    if (!grades.length) {
      throw new CustomError("Professor has no graded courses", 404);
    }
    return grades;
  }
}
