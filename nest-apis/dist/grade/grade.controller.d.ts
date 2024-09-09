import { GradeService } from './grade.service';
import { CreateGradeDTO } from './dto/create-grade.dto';
import { UpdateGradeDTO } from './dto/update-grade.dto';
import { User } from 'src/user/user.entity';
export declare class GradeController {
    private readonly gradeService;
    constructor(gradeService: GradeService);
    createGrade(user: User, createGradeDto: CreateGradeDTO): Promise<import("./grade.entity").Grade>;
    getAllGrades(search: string, limit: number, offset: number): Promise<{
        grades: import("./grade.entity").Grade[];
        pagination: any;
    }>;
    getGrade(gradeId: string): Promise<import("./grade.entity").Grade>;
    getGradesByStudent(studentId: string): Promise<import("./grade.entity").Grade[]>;
    getGradesByStudentAndSemester(studentId: string, semesterId: string): Promise<import("./grade.entity").Grade[]>;
    getGradesByCourse(courseId: string): Promise<import("./grade.entity").Grade[]>;
    getGradesBySemester(semesterId: string): Promise<import("./grade.entity").Grade[]>;
    getGradesByProfessor(professorId: string): Promise<import("./grade.entity").Grade[]>;
    updateGrade(gradeId: string, updateGradeDto: UpdateGradeDTO, user: User): Promise<import("./grade.entity").Grade>;
    deleteGrade(gradeId: string): Promise<void>;
}
