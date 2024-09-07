import { Model } from 'sequelize-typescript';
import { Course } from '../course/course.entity';
import { User } from '../user/user.entity';
import { Hall } from '../hall/hall.entity';
export declare class Lecture extends Model<Lecture> {
    id: string;
    courseId: string;
    professorId: string;
    hallId: string;
    dayOfWeek: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
    startTime: string;
    endTime: string;
    recurrencePattern?: string;
    recurrenceEndDate?: Date;
    course: Course;
    professor: User;
    hall: Hall;
}
