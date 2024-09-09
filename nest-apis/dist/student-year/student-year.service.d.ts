import { StudentYear } from './student-year.entity';
import { User } from 'src/user/user.entity';
import { Course } from 'src/course/course.entity';
import { CreateStudentYearDto } from './dto/create-student-year.dto';
import { Department } from 'src/department/department.entity';
import { UpdateStudentYearDto } from './dto/update-student-year.dto';
export declare class StudentYearService {
    private studentYearModel;
    private userModel;
    private courseModel;
    private departmentModel;
    constructor(studentYearModel: typeof StudentYear, userModel: typeof User, courseModel: typeof Course, departmentModel: typeof Department);
    createStudentYear(createStudentYearDto: CreateStudentYearDto): Promise<StudentYear>;
    getAllStudentYears(): Promise<StudentYear[]>;
    getStudentYearsByStudentId(studentId: string): Promise<StudentYear[]>;
    updateStudentYear(studentYearId: string, updateStudentYearDto: UpdateStudentYearDto): Promise<StudentYear>;
    deleteStudentYear(studentYearId: string): Promise<void>;
}
