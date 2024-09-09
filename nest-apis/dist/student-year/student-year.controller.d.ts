import { StudentYearService } from './student-year.service';
import { CreateStudentYearDto } from './dto/create-student-year.dto';
import { UpdateStudentYearDto } from './dto/update-student-year.dto';
export declare class StudentYearController {
    private readonly studentYearService;
    constructor(studentYearService: StudentYearService);
    createStudentYear(createStudentYearDto: CreateStudentYearDto): Promise<import("./student-year.entity").StudentYear>;
    getAllStudentYears(): Promise<import("./student-year.entity").StudentYear[]>;
    getStudentYearsByStudentId(studentId: string): Promise<import("./student-year.entity").StudentYear[]>;
    updateStudentYear(studentYearId: string, updateStudentYearDto: UpdateStudentYearDto): Promise<import("./student-year.entity").StudentYear>;
    deleteStudentYear(studentYearId: string): Promise<void>;
}
