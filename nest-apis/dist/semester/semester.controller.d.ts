import { SemesterService } from './semester.service';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';
export declare class SemesterController {
    private readonly semesterService;
    constructor(semesterService: SemesterService);
    createSemester(createSemesterDto: CreateSemesterDto): Promise<import("./semester.entity").Semester>;
    getAllSemesters(): Promise<import("./semester.entity").Semester[]>;
    getSemester(semesterId: string): Promise<import("./semester.entity").Semester>;
    getSemesterGrades(semesterId: string): Promise<import("../grade/grade.entity").Grade[]>;
    getStudentEnrolledCourses(semesterId: string): Promise<import("../student-course/student-course.entity").StudentCourse[]>;
    updateSemester(semesterId: string, updateSemesterDto: UpdateSemesterDto): Promise<import("./semester.entity").Semester>;
    deleteSemester(semesterId: string): Promise<{
        message: string;
    }>;
}
