import Course from "../models/Course";
import ProfessorCourse from "../models/ProfessorCourses";
import User from "../models/User";

export class ProfessorCourseService {
  constructor(private professorCourseModel: typeof ProfessorCourse) {}

  async createProfessorCourse(courseId: string, professorId: string) {
    const professor = await User.findByPk(professorId);
    if (!professor || professor.role !== "Professor") {
      throw new Error("Professor not found");
    }
    const course = await Course.findByPk(courseId);
    if (!course) {
      throw new Error("Course not found");
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
      throw new Error("Course not found");
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
      throw new Error("Professor not found");
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
    const course = await Course.findByPk(courseId);
    if (!course) {
      throw new Error("Course not found");
    }
    const professor = await User.findByPk(professorId);
    if (!professor || professor.role !== "Professor") {
      throw new Error("Professor not found");
    }

    const professorCourse = await this.professorCourseModel.findOne({
      where: { courseId, professorId },
    });
    if (!professorCourse) {
      throw new Error("Professor course not found");
    }
    await professorCourse.destroy();
  }
}
