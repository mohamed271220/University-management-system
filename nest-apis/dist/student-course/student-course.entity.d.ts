import { Model } from 'sequelize-typescript';
import { User } from '../user/user.entity';
import { Course } from '../course/course.entity';
import { Semester } from '../entities/semester.entity';
export declare class StudentCourse extends Model<StudentCourse> {
    studentId: string;
    courseId: string;
    semesterId: string;
    enrollmentDate?: Date;
    student: User;
    course: Course;
    semester: Semester;
    static uniqueEnrollmentIndex: void;
}
