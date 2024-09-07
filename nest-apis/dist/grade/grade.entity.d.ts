import { Model } from 'sequelize-typescript';
import { User } from '../user/user.entity';
import { Course } from '../course/course.entity';
import { Semester } from '../entities/semester.entity';
export declare class Grade extends Model<Grade> {
    id: string;
    studentId: string;
    courseId: string;
    semesterId: string;
    grade: string;
    date: Date;
    description?: string;
    student: User;
    course: Course;
    semester: Semester;
}
