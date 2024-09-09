import { StudentCourseService } from './student-course.service';
import { CreateStudentCourseDto, UpdateStudentCourseDto } from './dto/index.dto';
import { User } from 'src/user/user.entity';
export declare class StudentCourseController {
    private readonly studentCourseService;
    constructor(studentCourseService: StudentCourseService);
    enrollStudentInCourse(studentId: string, createStudentCourseDto: CreateStudentCourseDto, user: User): Promise<import("./student-course.entity").StudentCourse[]>;
    getStudentCourses(studentId: string, user: User): Promise<import("./student-course.entity").StudentCourse[]>;
    getCourseStudents(courseId: string, user: User): Promise<import("./student-course.entity").StudentCourse[]>;
    getStudentCourse(studentId: string, courseId: string, user: User): Promise<import("./student-course.entity").StudentCourse>;
    updateStudentCourse(studentId: string, courseId: string, updateStudentCourseDto: UpdateStudentCourseDto, user: User): Promise<import("./student-course.entity").StudentCourse>;
    removeStudentFromCourse(studentId: string, courseId: string, user: User): Promise<{
        message: string;
    }>;
}
