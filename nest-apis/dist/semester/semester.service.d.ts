import { Course } from 'src/course/course.entity';
import { Grade } from 'src/grade/grade.entity';
import { User } from 'src/user/user.entity';
import { Semester } from './semester.entity';
import { StudentCourse } from 'src/student-course/student-course.entity';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';
export declare class SemesterService {
    private semesterModel;
    private courseModel;
    private gradeModel;
    private userUserModel;
    private studentCourseModel;
    constructor(semesterModel: typeof Semester, courseModel: typeof Course, gradeModel: typeof Grade, userUserModel: typeof User, studentCourseModel: typeof StudentCourse);
    createSemester(createSemesterDto: CreateSemesterDto): Promise<Semester>;
    getAllSemesters(): Promise<Semester[]>;
    getSemester(semesterId: string): Promise<Semester>;
    getSemesterGrades(semesterId: string): Promise<Grade[]>;
    getStudentEnrolledCourses(semesterId: string): Promise<StudentCourse[]>;
    updateSemester(semesterId: string, updateSemesterDto: UpdateSemesterDto): Promise<Semester>;
    deleteSemester(semesterId: string): Promise<{
        message: string;
    }>;
}
