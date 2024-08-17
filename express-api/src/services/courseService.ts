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

export class CourseService {
  constructor(private courseModel: typeof Course) {}

  async createCourse(data: courseData) {
    const { code, name, description, credits, departmentId, professorId } =
      data;

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
    return course;
  }

  async updateCourse(id: string, data: courseData) {
    const course = await this.courseModel.findByPk(id);
    if (!course) throw new Error("Course not found");

    const updatedCourse = await course.update(data);
    return updatedCourse;
  }

  async deleteCourse(id: string) {
    const course = await this.courseModel.findByPk(id);
    if (!course) throw new Error("Course not found");

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
    if (!course) throw new Error("Course not found");
    return course.professors;
  }

  async getStudentsByCourseId(id: string) {
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

    if (!course) throw new Error("Course not found");

    return course;
  }

  async getLecturesByCourseId(id: string) {
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

    if (!course) throw new Error("Course not found");

    return course.Lectures;
  }
}
