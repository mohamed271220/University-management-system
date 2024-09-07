import { Model } from 'sequelize-typescript';
import { Department } from '../department/department.entity';
import { User } from '../user/user.entity';
import { Lecture } from '../lecture/lecture.entity';
import { Grade } from '../grade/grade.entity';
import { DepartmentYearCourses } from '../department-year-courses/department-year-courses.entity';
export declare class Course extends Model<Course> {
    id: string;
    code: string;
    name: string;
    description?: string;
    credits: number;
    departmentId: string;
    professorId?: string;
    department: Department;
    professor: User;
    lectures: Lecture[];
    grades: Grade[];
    professors: User[];
    students: User[];
    departmentYearCourses: DepartmentYearCourses[];
    createdAt?: Date;
    updatedAt?: Date;
}
