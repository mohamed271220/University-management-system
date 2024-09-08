import { Model } from 'sequelize-typescript';
import { User } from '../user/user.entity';
import { Course } from '../course/course.entity';
export declare class ProfessorCourse extends Model<ProfessorCourse> {
    professorId: string;
    courseId: string;
    static uniqueIndex: void;
    professor: User;
    course: Course;
}
