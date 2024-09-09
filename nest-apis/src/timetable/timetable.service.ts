import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from 'src/course/course.entity';
import { Department } from 'src/department/department.entity';
import { Hall } from 'src/hall/hall.entity';
import { ProfessorCourse } from 'src/professor-course/professor-course.entity';
import { Semester } from 'src/semester/semester.entity';
import { StudentCourse } from 'src/student-course/student-course.entity';
import { User } from 'src/user/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { LectureWithRelations } from './interfaces/lecture-with-realtions';
import { Lecture } from 'src/lecture/lecture.entity';
import { DepartmentYearCourses } from 'src/department-year-courses/department-year-courses.entity';

export enum Year {
  '1st Year' = '1st Year',
  '2nd Year' = '2nd Year',
  '3rd Year' = '3rd Year',
  '4th Year' = '4th Year',
}

@Injectable()
export class TimetableService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Course)
    private courseModel: typeof Course,
    @InjectModel(Department)
    private departmentModel: typeof Department,
    @InjectModel(Semester)
    private semesterModel: typeof Semester,
    @InjectModel(Hall)
    private hallModel: typeof Hall,
    @InjectModel(StudentCourse)
    private studentCourseModel: typeof StudentCourse,
    @InjectModel(ProfessorCourse)
    private professorCourseModel: typeof ProfessorCourse,
    @InjectModel(Lecture)
    private lectureModel: typeof Lecture,
    @InjectModel(DepartmentYearCourses)
    private departmentYearCoursesModel: typeof DepartmentYearCourses,
  ) {}

  private buildTimetable(lectures: LectureWithRelations[]) {
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

  async getStudentTimetable(studentId: string, semesterId: string) {
    const student = await this.userModel.findByPk(studentId);

    if (!student || student.role !== 'Student') {
      throw new NotFoundException('Student not found');
    }

    const courses = await this.studentCourseModel.findAll({
      where: { studentId, semesterId },
    }); // get all courses that the student is enrolled in for certain semester

    const lectures = await this.lectureModel.findAll({
      where: { courseId: courses.map((course) => course.courseId) },
      include: [
        {
          model: this.courseModel,
          as: 'course',
        },
        {
          model: this.userModel,
          as: 'professor',
          attributes: { exclude: ['passwordHash'] },
        },
        {
          model: this.hallModel,
          as: 'hall',
        },
      ],
    }); // get all lectures for the courses

    return this.buildTimetable(lectures as LectureWithRelations[]);
  }

  async getProfessorTimetable(professorId: string): Promise<any> {
    const professor = await this.userModel.findByPk(professorId);
    if (!professor || professor.role !== 'Professor') {
      throw new NotFoundException('Professor not found');
    }
    const courses = await ProfessorCourse.findAll({
      where: { professorId },
    });

    if (!courses.length) {
      throw new NotFoundException('Professor has no courses assigned');
    }

    const lectures = await this.lectureModel.findAll({
      where: { courseId: courses.map((c) => c.courseId) },
      include: [
        {
          model: this.courseModel,
          as: 'course',
        },
        {
          model: this.userModel,
          as: 'professor',
          attributes: { exclude: ['passwordHash'] },
        },
        {
          model: this.hallModel,
          as: 'hall',
        },
      ],
    });

    if (!lectures.length) {
      throw new NotFoundException('Professor has no lectures assigned');
    }

    return this.buildTimetable(lectures as LectureWithRelations[]);
  }

  async getDepartmentTimetable(departmentId: string): Promise<any> {
    {
      const department = await this.departmentModel.findByPk(departmentId);
      if (!department) {
        throw new NotFoundException('Department not found');
      }
      const courses = await this.courseModel.findAll({
        where: { departmentId },
      });

      const lectures = await this.lectureModel.findAll({
        where: {
          courseId: courses.map((course) => course.id),
        },
        include: [
          {
            model: this.courseModel,
            as: 'course',
          },
          {
            model: this.userModel,
            as: 'professor',
            attributes: { exclude: ['passwordHash'] },
          },
          {
            model: this.hallModel,
            as: 'hall',
          },
        ],
      });

      return this.buildTimetable(lectures as LectureWithRelations[]);
    }
  }
  async getHallTimetable(hallId: string): Promise<any> {
    const hall = await this.hallModel.findByPk(hallId);
    if (!hall) {
      throw new NotFoundException('Hall not found');
    }
    const lectures = await this.lectureModel.findAll({
      where: { hallId },
      include: [
        {
          model: this.courseModel,
          as: 'course',
        },
        {
          model: this.courseModel,
          as: 'professor',
          attributes: { exclude: ['passwordHash'] },
        },
        {
          model: this.hallModel,
          as: 'hall',
        },
      ],
    }); // get all lectures for the specific hall

    return this.buildTimetable(lectures as LectureWithRelations[]);
  }

  async getStudentYearTimetable(departmentId: string, year: Year) {
    const department = await this.departmentModel.findByPk(departmentId);
    if (!department) {
      throw new NotFoundException('Department not found');
    }

    // Get all courses for the department and year
    const departmentCourses = await this.departmentYearCoursesModel.findAll({
      where: { departmentId, year },
      include: [{ model: this.courseModel, as: 'Course' }],
    });

    // Find all lectures for these courses
    const lectures = await this.lectureModel.findAll({
      where: { courseId: departmentCourses.map((dc) => dc.courseId) },
      include: [
        {
          model: this.courseModel,
          as: 'course',
        },
        {
          model: this.userModel,
          as: 'professor',
          attributes: { exclude: ['passwordHash'] },
        },
        {
          model: this.hallModel,
          as: 'hall',
        },
      ],
    });

    return this.buildTimetable(lectures as LectureWithRelations[]);
  }
}
