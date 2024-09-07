import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from 'src/course/course.entity';
import { Semester } from 'src/entities/semester.entity';
import { User } from 'src/user/user.entity';
import { Grade } from './grade.entity';
import { CreateGradeDTO } from './dto/create-grade.dto';
import { StudentCourse } from 'src/student-course/student-course.entity';
import { ProfessorCourse } from 'src/entities/professor-course.entity';
import { v4 as uuid } from 'uuid';
import { UpdateGradeDTO } from './dto/update-grade.dto';
import { log } from 'console';

@Injectable()
export class GradeService {
  constructor(
    @InjectModel(Grade)
    private readonly gradeModel: typeof Grade,
    @InjectModel(User)
    private readonly userModel: typeof User,
    @InjectModel(Semester)
    private readonly semesterModel: typeof Semester,
    @InjectModel(Course)
    private readonly courseModel: typeof Course,
    @InjectModel(StudentCourse)
    private readonly studentCourseModel: typeof StudentCourse,
    @InjectModel(ProfessorCourse)
    private readonly professorCourseModel: typeof ProfessorCourse,
  ) {}

  async createGrade(
    user: User,
    createGradeDto: CreateGradeDTO,
  ): Promise<Grade> {
    console.info('user', user.id);
    const [
      student,
      course,
      semester,
      isTheStudentInTheCourse,
      // isTheProTeachingThisCourse,
    ] = await Promise.all([
      this.userModel.findByPk(createGradeDto.studentId),
      this.courseModel.findByPk(createGradeDto.courseId),
      this.semesterModel.findByPk(createGradeDto.semesterId),
      this.studentCourseModel.findOne({
        where: {
          studentId: createGradeDto.studentId,
          courseId: createGradeDto.courseId,
        },
      }),
    ]);

    // console.log(user);

    if (user?.role === 'Professor') {
      const isTheProTeachingThisCourse =
        await this.professorCourseModel.findOne({
          where: {
            professorId: user.id,
            courseId: createGradeDto.courseId,
          },
        });
      if (!isTheProTeachingThisCourse) {
        throw new BadRequestException('Professor is not teaching this course');
      }
    }
    if (!student || student.role !== 'Student') {
      throw new NotFoundException('Student not found');
    }
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    if (!semester) {
      throw new NotFoundException('Semester not found');
    }
    if (!isTheStudentInTheCourse) {
      throw new BadRequestException('Student is not enrolled in the course');
    }

    // console.log('createGradeDto', createGradeDto);

    try {
      const grade = await this.gradeModel.create({
        id: uuid(),
        studentId: createGradeDto.studentId,
        courseId: createGradeDto.courseId,
        semesterId: createGradeDto.semesterId,
        date: createGradeDto.date,
        grade: createGradeDto.grade,
        description: createGradeDto.description,
      });
      return grade;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException(
          'Grade already exists for this student in this course and semester',
        );
      }
      Logger.error('Failed to create grade', error);
      throw new BadRequestException('Failed to create grade');
    }
  }

  async getAllGrades(
    search: string,
    limit: number,
    offset: number,
  ): Promise<{ grades: Grade[]; pagination: any }> {
    const { count, rows } = await this.gradeModel.findAndCountAll({
      nest: true,
      raw: true,
      limit,
      offset,
      include: [
        {
          model: this.userModel,
          attributes: ['id', 'username'],
        },
        this.courseModel,
        Semester,
      ],
    });
    if (!rows.length) {
      throw new NotFoundException('Grades not found');
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

  async getGradeById(gradeId: string): Promise<Grade> {
    const grade = await this.gradeModel.findByPk(gradeId, {
      nest: true,
      raw: true,
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
        {
          model: this.courseModel,
        },
        {
          model: Semester,
        },
      ],
    });
    if (!grade) {
      throw new NotFoundException('Grade not found');
    }
    return grade;
  }

  async getGradesByStudent(studentId: string): Promise<Grade[]> {
    const student = await this.userModel.findByPk(studentId);
    if (!student || student.role !== 'Student') {
      throw new NotFoundException('Student not found');
    }
    const grades = await this.gradeModel.findAll({
      where: { studentId },
      nest: true,
      raw: true,
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
        {
          model: this.courseModel,
        },
        {
          model: Semester,
        },
      ],
    });
    if (!grades.length) {
      throw new NotFoundException('Grades not found');
    }
    return grades;
  }

  async getGradesByStudentAndSemester(
    studentId: string,
    semesterId: string,
  ): Promise<Grade[]> {
    // const student = await this.userModel.findByPk(studentId);
    // const semester = await this.semesterModel.findByPk(semesterId);
    const [student, semester] = await Promise.all([
      this.userModel.findByPk(studentId),
      this.semesterModel.findByPk(semesterId),
    ]);
    if (!student || student.role !== 'Student') {
      throw new NotFoundException('Student not found');
    }
    if (!semester) {
      throw new NotFoundException('Semester not found');
    }
    const grades = await this.gradeModel.findAll({
      where: { studentId, semesterId },
      nest: true,
      raw: true,
      include: [
        {
          model: this.userModel,
          attributes: ['id', 'username'],
        },
        {
          model: this.courseModel,
        },
        {
          model: Semester,
        },
      ],
    });
    if (!grades.length) {
      throw new NotFoundException('Grades not found');
    }
    return grades;
  }

  async getGradesByCourse(courseId: string): Promise<Grade[]> {
    const course = await this.courseModel.findByPk(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    const grades = await this.gradeModel.findAll({
      where: { courseId },
      nest: true,
      raw: true,
      include: [
        {
          model: this.userModel,
          attributes: ['id', 'username'],
        },
        {
          model: this.courseModel,
        },
        {
          model: this.semesterModel,
        },
      ],
    });
    if (!grades.length) {
      throw new NotFoundException('Grades not found');
    }
    return grades;
  }

  async getGradesBySemester(semesterId: string): Promise<Grade[]> {
    const semester = await this.semesterModel.findByPk(semesterId);
    if (!semester) {
      throw new NotFoundException('Semester not found');
    }
    const grades = await this.gradeModel.findAll({
      where: { semesterId },
      nest: true,
      raw: true,
      include: [
        {
          model: this.userModel,
          attributes: ['id', 'username'],
        },
        {
          model: this.courseModel,
        },
        {
          model: this.semesterModel,
        },
      ],
    });
    if (!grades.length) {
      throw new NotFoundException('Grades not found');
    }
    return grades;
  }
  async getGradesByProfessor(professorId: string): Promise<Grade[]> {
    const professor = await this.userModel.findByPk(professorId);
    if (!professor || professor.role !== 'Professor') {
      throw new NotFoundException('Professor not found');
    }
    const grades = await this.gradeModel.findAll({
      nest: true,
      raw: true,
      include: [
        {
          model: this.userModel,
          attributes: ['id', 'username'],
        },
        {
          model: this.courseModel,
        },
        {
          model: this.semesterModel,
        },
      ],
    });
    if (!grades.length) {
      throw new NotFoundException('Grades not found');
    }
    return grades;
  }

  async updateGrade(
    gradeId: string,
    updateGradeDto: UpdateGradeDTO,
    user: User,
  ): Promise<Grade> {
    const grade = await this.gradeModel.findByPk(gradeId);
    if (!grade) {
      throw new NotFoundException('Grade not found');
    }

    // Destructure fields from the updates to check if they exist
    const { studentId, courseId, semesterId } = updateGradeDto;

    // Determine which studentId to validate against
    const effectiveStudentId = studentId || grade.studentId;

    // Determine which courseId to validate against
    const effectiveCourseId = courseId || grade.courseId;

    // Perform validations only for the fields being updated
    const [student, course, semester, isTheStudentInTheCourse] =
      await Promise.all([
        this.userModel.findByPk(effectiveStudentId),
        effectiveCourseId ? this.courseModel.findByPk(effectiveCourseId) : null,
        semesterId ? this.semesterModel.findByPk(semesterId) : null,
        this.studentCourseModel.findOne({
          where: { studentId: effectiveStudentId, courseId: effectiveCourseId },
        }),
      ]);

    // Professor validation only if courseId is being updated
    if (user?.role === 'Professor' && effectiveCourseId) {
      const isTheProTeachingThisCourse = await ProfessorCourse.findOne({
        where: { professorId: user.id, courseId: effectiveCourseId },
      });
      if (!isTheProTeachingThisCourse) {
        throw new BadRequestException('Professor is not teaching this course');
      }
    }

    // Validate student, course, semester, and enrollment
    if (!student || student.role !== 'Student') {
      throw new NotFoundException('Student not found');
    }
    if (effectiveCourseId && !course) {
      throw new NotFoundException('Course not found');
    }
    if (semesterId && !semester) {
      throw new NotFoundException('Semester not found');
    }
    if (!isTheStudentInTheCourse) {
      throw new BadRequestException('Student is not enrolled in the course');
    }

    // Update the grade record with the valid updates
    await grade.update(updateGradeDto);
    return grade;
  }
  async deleteGrade(gradeId: string) {
    const grade = await this.gradeModel.findByPk(gradeId);
    if (!grade) {
      throw new NotFoundException('Grade not found');
    }
    await grade.destroy();
  }
}
