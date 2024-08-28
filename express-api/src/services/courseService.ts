import {
  courseData,
  CourseWithLectures,
  CourseWithProfessors,
} from "../interfaces";
import Course from "../models/Course";
import { v4 as uuid } from "uuid";
import Department from "../models/Department";
import User from "../models/User";
import Profile from "../models/Profile";
import Lecture from "../models/Lecture";
import Hall from "../models/Hall";
import { Op } from "sequelize";
import { CustomError } from "../utils/CustomError";

export class CourseService {
  constructor(private courseModel: typeof Course) {}

  async createCourse(data: courseData) {
    const { code, name, description, credits, departmentId, professorId } =
      data;

    const [existingCourse, professor, department] = await Promise.all([
      this.courseModel.findOne({
        where: { code },
      }),
      User.findByPk(professorId),
      Department.findByPk(departmentId),
    ]);

    if (existingCourse) {
      throw new CustomError("A course with this code already exists", 400);
    }

    if (!professor || professor.role !== "Professor") {
      throw new CustomError("Invalid professor ID", 400);
    }

    if (!department) {
      throw new CustomError("Invalid department ID", 400);
    }

    const course = await this.courseModel.create({
      id: uuid(),
      code,
      name,
      description,
      credits,
      departmentId,
      professorId,
    } as courseData & { id: string });
    return course;
  }

  async getAllCourses() {
    const courses = await this.courseModel.findAll({
      include: [
        {
          model: Department,
          attributes: ["name", "code"],
        },
        {
          model: User,
          as: "professor",
          attributes: ["username"],
        },
      ],
    });

    if (!courses) throw new CustomError("No courses found", 404);
    return courses;
  }

  async getCourseById(id: string) {
    const course = await this.courseModel.findByPk(id, {
      include: [
        {
          model: Department,
          attributes: ["name", "code"],
        },
        {
          model: User,
          as: "professor",
          attributes: ["username"],
        },
      ],
    });
    if (!course) throw new CustomError("Course not found", 404);
    return course;
  }

  async updateCourse(id: string, data: courseData) {
    const course = await this.courseModel.findByPk(id);
    if (!course) {
      throw new CustomError("Course not found", 404);
    }

    const existingCourse = await this.courseModel.findOne({
      where: {
        code: data.code,
        id: { [Op.ne]: id }, // Ensure the course found is not the same as the current course
      },
    });
    if (existingCourse) {
      throw new CustomError("A course with this code already exists", 400);
    }

    const { code, name, description, credits, departmentId, professorId } =
      data;
    if (code) course.code = code;
    if (name) course.name = name;
    if (description) course.description = description;
    if (credits) course.credits = credits;
    if (departmentId) course.departmentId = departmentId;
    if (professorId) course.professorId = professorId;

    await course.save();
    return course;
  }

  async deleteCourse(id: string) {
    const course = await this.courseModel.findByPk(id);
    if (!course) throw new CustomError("Course not found", 404);

    await course.destroy();
  }

  async getProfessorByCourseId(id: string) {
    const course: CourseWithProfessors | null = await Course.findByPk(id, {
      include: [
        {
          model: User,
          as: "professors",
          attributes: ["id", "username"],
        },
      ],
    });
    if (!course) throw new CustomError("No courses found", 404);
    return course.professors;
  }

  async getStudentsByCourseId(id: string) {
    const isCourse = await Course.findByPk(id);
    if (!isCourse) throw new CustomError("Course not found", 404);
    const course = await Course.findByPk(id, {
      include: [
        {
          model: User,
          as: "students",
          include: [
            {
              model: Profile,
              attributes: ["firstName", "lastName"],
            },
          ],
          attributes: ["id", "username"],
        },
      ],
    });

    if (!course) throw new CustomError("Students not found", 404);

    return course;
  }

  async getLecturesByCourseId(id: string) {
    const isCourse = await Course.findByPk(id);
    if (!isCourse) throw new CustomError("Course not found", 404);
    const course: CourseWithLectures | null = await Course.findByPk(id, {
      include: [
        {
          model: Lecture,
          as: "Lectures",
          include: [
            {
              model: Hall,
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    if (!course?.Lectures?.length)
      throw new CustomError("Lectures not found", 404);

    return course.Lectures;
  }
}
