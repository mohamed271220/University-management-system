import { Course } from 'src/course/course.entity';
import { Department } from 'src/department/department.entity';
import { DepartmentYearCourses } from './department-year-courses.entity';
import { CreateDepartmentYearCourseDto } from './dto/create-department-year-courses.dto';
import { UpdateDepartmentYearCourseDto } from './dto/update-department-year-courses.dto';
export declare class DepartmentYearCoursesService {
    private departmentModel;
    private courseModel;
    private departmentYearCoursesModel;
    constructor(departmentModel: typeof Department, courseModel: typeof Course, departmentYearCoursesModel: typeof DepartmentYearCourses);
    createDepartmentYearCourses(createDepartmentYearCoursesDto: CreateDepartmentYearCourseDto): Promise<DepartmentYearCourses>;
    getAllDepartmentYearCourses(): Promise<DepartmentYearCourses[]>;
    updateDepartmentYearCourses(departmentYearCourseId: string, updateDepartmentYearCoursesDto: UpdateDepartmentYearCourseDto): Promise<DepartmentYearCourses>;
    deleteDepartmentYearCourses(departmentYearCourseId: string): Promise<string>;
}
