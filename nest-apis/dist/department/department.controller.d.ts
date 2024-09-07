import { DepartmentService } from './department.service';
import { CreateDepartmentDTO } from './dto/create-department.dto';
import { UpdateDepartmentDTO } from './dto/update-department.dto';
export declare class DepartmentController {
    private readonly departmentService;
    constructor(departmentService: DepartmentService);
    createDepartment(createDepartmentDto: CreateDepartmentDTO): Promise<import("./department.entity").Department>;
    getAllDepartments(search: string, limit: number, offset: number): Promise<{
        departments: import("./department.entity").Department[];
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
    getDepartment(departmentId: string): Promise<import("./department.entity").Department>;
    getDepartmentCourses(departmentId: string): Promise<import("../course/course.entity").Course[]>;
    getDepartmentHalls(departmentId: string): Promise<import("../hall/hall.entity").Hall[]>;
    updateDepartment(departmentId: string, updateDepartmentDto: UpdateDepartmentDTO): Promise<import("./department.entity").Department>;
    deleteDepartment(departmentId: string): Promise<import("./department.entity").Department>;
}
