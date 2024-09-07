import { Model } from 'sequelize-typescript';
import { Department } from '../department/department.entity';
import { Course } from '../course/course.entity';
export declare class DepartmentYearCourses extends Model<DepartmentYearCourses> {
    id: string;
    departmentId: string;
    courseId: string;
    year: '1st Year' | '2nd Year' | '3rd Year' | '4th Year';
    department: Department;
    course: Course;
}
