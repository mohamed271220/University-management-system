import Course from "../models/Course";
import ProfessorCourse from "../models/ProfessorCourses";
import User from "../models/User";
import { CustomError } from "../utils/CustomError";

export class ProfessorCourseService {
  constructor(private professorCourseModel: typeof ProfessorCourse) {}

  async createProfessorCourse(courseId: string, professorId: string) {
    const [professor, course] = await Promise.all([
      User.findByPk(professorId),
      Course.findByPk(courseId),
    ])
    // const professor = await User.findByPk(professorId);
    if (!professor || professor.role !== "Professor") {
      throw new CustomError("Professor not found", 404);
    }
    // const course = await Course.findByPk(courseId);
    if (!course) {
      throw new CustomError("Course not found", 404);
    }
    const professorCourse = await this.professorCourseModel.create({
      courseId,
      professorId,
    });
    return professorCourse;
  }

  async getProfessorsByCourseId(courseId: string) {
    const course = await Course.findByPk(courseId);
    if (!course) {
      throw new CustomError("Course not found", 404);
    }
    const courseProf = await this.professorCourseModel.findAll({
      where: { courseId },
      include: [
        {
          model: User,
          attributes: { exclude: ["passwordHash", "email", "id"] },
        },
      ],
    });
    return courseProf;
  }

  async getAllProfessorCourses(professorId: string) {
    const professor = await User.findByPk(professorId);
    if (!professor || professor.role !== "Professor") {
      throw new CustomError("Professor not found", 404);
    }
    const professorCourses = await this.professorCourseModel.findAll({
      where: { professorId },
      include: [
        {
          model: User,
          attributes: { exclude: ["passwordHash", "email", "id"] },
        },
      ],
    });
    return professorCourses;
  }

  async getAllCourses() {
    const professorCourses = await this.professorCourseModel.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: ["passwordHash", "email"] },
        },
        {
          model: Course,
        },
      ],
    });
    return professorCourses;
  }

  async getProfessorCourseById(id: string) {
    const professorCourse = await this.professorCourseModel.findByPk(id, {
      include: [
        {
          model: User,
          attributes: { exclude: ["passwordHash", "email"] },
        },
        {
          model: Course,
        },
      ],
    });
    return professorCourse;
  }

  async deleteProfessorCourse(courseId: string, professorId: string) {
    const [professor, course] = await Promise.all([
      User.findByPk(professorId),
      Course.findByPk(courseId),
    ])
    // const course = await Course.findByPk(courseId);
    if (!course) {
      throw new CustomError("Course not found", 404);
    }
    // const professor = await User.findByPk(professorId);
    if (!professor || professor.role !== "Professor") {
      throw new CustomError("Professor not found", 404);
    }

    const professorCourse = await this.professorCourseModel.findOne({
      where: { courseId, professorId },
    });
    if (!professorCourse) {
      throw new CustomError("Professor course not found", 404);
    }
    await professorCourse.destroy();
  }
}
