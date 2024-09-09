import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentYear } from './student-year.entity';
import { User } from 'src/user/user.entity';
import { Course } from 'src/course/course.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStudentYearDto } from './dto/create-student-year.dto';
import { Department } from 'src/department/department.entity';
import { v4 as uuid } from 'uuid';
import { UpdateStudentYearDto } from './dto/update-student-year.dto';

@Injectable()
export class StudentYearService {
  constructor(
    @InjectModel(StudentYear)
    private studentYearModel: typeof StudentYear,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Course)
    private courseModel: typeof Course,
    @InjectModel(Department)
    private departmentModel: typeof Department,
  ) {}

  async createStudentYear(createStudentYearDto: CreateStudentYearDto) {
    const { studentId, effectiveDate, departmentId } = createStudentYearDto;
    const [existingStudentYear, student, department] = await Promise.all([
      this.studentYearModel.findOne({
        where: { studentId, effectiveDate },
      }),
      this.userModel.findOne({ where: { id: studentId } }),
      this.departmentModel.findOne({ where: { id: departmentId } }),
    ]);

    if (existingStudentYear) {
      throw new NotFoundException('Student year already exists');
    }

    if (!student || student.role !== 'Student') {
      throw new NotFoundException('Student not found');
    }

    if (!department) {
      throw new NotFoundException('Department not found');
    }

    const studentYear = await this.studentYearModel.create({
      id: uuid(),
      ...createStudentYearDto,
    });

    return studentYear;
  }

  async getAllStudentYears() {
    return this.studentYearModel.findAll();
  }
  async getStudentYearsByStudentId(studentId: string) {
    const student = await this.userModel.findByPk(studentId);
    if (!student || student.role !== 'Student') {
      throw new NotFoundException('Student not found');
    }
    return this.studentYearModel.findAll({
      where: { studentId },
    });
  }

  async updateStudentYear(
    studentYearId: string,
    updateStudentYearDto: UpdateStudentYearDto,
  ) {
    const studentYear = await this.studentYearModel.findByPk(studentYearId);
    if (!studentYear) {
      throw new NotFoundException('Student year not found');
    }

    return studentYear.update(updateStudentYearDto);
  }

  async deleteStudentYear(studentYearId: string) {
    const studentYear = await this.studentYearModel.findByPk(studentYearId);
    if (!studentYear) {
      throw new NotFoundException('Student year not found');
    }

    return studentYear.destroy();
  }
}
