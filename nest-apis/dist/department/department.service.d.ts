import { Department } from './department.entity';
import { Course } from 'src/course/course.entity';
import { Hall } from 'src/hall/hall.entity';
import { CreateDepartmentDTO } from './dto/create-department.dto';
import { UpdateDepartmentDTO } from './dto/update-department.dto';
export declare class DepartmentService {
    private departmentModel;
    private courseModel;
    private hallModel;
    constructor(departmentModel: typeof Department, courseModel: typeof Course, hallModel: typeof Hall);
    createDepartment(createDepartmentDto: CreateDepartmentDTO): Promise<Department>;
    getAllDepartments(search?: string, limit?: number, offset?: number): Promise<{
        departments: Department[];
        pagination: {
            totalItems: number;
            itemsPerPage: number;
            currentPage: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            nextPage: number;
            previousPage: number;
        };
    }>;
    getDepartment(departmentId: string): Promise<Department>;
    getDepartmentCourses(departmentId: string): Promise<Course[]>;
    getDepartmentHalls(departmentId: string): Promise<Hall[]>;
    updateDepartment(departmentId: string, updateDepartmentDto: UpdateDepartmentDTO): Promise<Department>;
    deleteDepartment(departmentId: string): Promise<Department>;
}
