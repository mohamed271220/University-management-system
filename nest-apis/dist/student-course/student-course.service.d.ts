import { StudentCourse } from './student-course.entity';
import { User } from 'src/user/user.entity';
import { Course } from 'src/course/course.entity';
import { Semester } from 'src/semester/semester.entity';
import { CreateStudentCourseDto, UpdateStudentCourseDto } from './dto/index.dto';
export declare class StudentCourseService {
    private studentCourseModel;
    private userModel;
    private courseModel;
    private semesterModel;
    constructor(studentCourseModel: typeof StudentCourse, userModel: typeof User, courseModel: typeof Course, semesterModel: typeof Semester);
    enrollStudentInCourse(studentId: string, createStudentCourseDto: CreateStudentCourseDto, user: User): Promise<StudentCourse[]>;
    getStudentCoursesByStudentId(studentId: string, user: User): Promise<StudentCourse[]>;
    getStudentsByCourseId(courseId: string, user: User): Promise<StudentCourse[]>;
    getStudentCourseById(studentId: string, courseId: string, user: User): Promise<StudentCourse>;
    updateStudentCourse(studentId: string, courseId: string, updateStudentCourseDto: UpdateStudentCourseDto, user: User): Promise<StudentCourse>;
    removeStudentFromCourse(studentId: string, courseId: string, user: User): Promise<{
        message: string;
    }>;
}
