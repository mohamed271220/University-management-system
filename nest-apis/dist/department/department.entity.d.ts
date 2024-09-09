import { Model } from 'sequelize-typescript';
import { Course } from '../course/course.entity';
import { StudentYear } from '../student-year/student-year.entity';
import { DepartmentYearCourses } from '../department-year-courses/department-year-courses.entity';
export declare class Department extends Model<Department> {
    id: string;
    name: string;
    code: string;
    courses: Course[];
    studentYears: StudentYear[];
    departmentYearCourses: DepartmentYearCourses[];
}
