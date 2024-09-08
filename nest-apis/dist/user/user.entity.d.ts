import { Model } from 'sequelize-typescript';
import { Profile } from '../profile/profile.entity';
import { Course } from '../course/course.entity';
import { Lecture } from '../lecture/lecture.entity';
import { Attendance } from '../attendance/attendance.entity';
import { Grade } from '../grade/grade.entity';
import { StudentYear } from '../student-year/student-year.entity';
export declare class User extends Model<User> {
    id: string;
    username: string;
    passwordHash: string;
    email: string;
    role: 'Admin' | 'Student' | 'Professor' | 'Staff';
    createdAt?: Date;
    updatedAt?: Date;
    profile: Profile;
    teachingCourses: Course[];
    lectures: Lecture[];
    attendanceRecords: Attendance[];
    grades: Grade[];
    professorCourses: Course[];
    enrolledCourses: Course[];
    studentYears: StudentYear[];
}
