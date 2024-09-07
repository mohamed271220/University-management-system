import { Model } from 'sequelize-typescript';
import { User } from '../user/user.entity';
import { Lecture } from '../lecture/lecture.entity';
export declare class Attendance extends Model<Attendance> {
    id: string;
    studentId: string;
    lectureId: string;
    status: 'Present' | 'Absent' | 'Excused';
    lectureDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
    student: User;
    lecture: Lecture;
}
