import { DepartmentYearCoursesService } from './department-year-courses.service';
import { CreateDepartmentYearCourseDto } from './dto/create-department-year-courses.dto';
import { UpdateDepartmentYearCourseDto } from './dto/update-department-year-courses.dto';
export declare class DepartmentYearCoursesController {
    private readonly departmentYearCoursesService;
    constructor(departmentYearCoursesService: DepartmentYearCoursesService);
    createDepartmentYearCourses(createDepartmentYearCoursesDto: CreateDepartmentYearCourseDto): Promise<import("./department-year-courses.entity").DepartmentYearCourses>;
    getAllDepartmentYearCourses(): Promise<import("./department-year-courses.entity").DepartmentYearCourses[]>;
    updateDepartmentYearCourses(departmentYearCourseId: string, updateDepartmentYearCoursesDto: UpdateDepartmentYearCourseDto): Promise<import("./department-year-courses.entity").DepartmentYearCourses>;
    deleteDepartmentYearCourses(departmentYearCourseId: string): Promise<string>;
}
