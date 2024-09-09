import { ProfessorCourseService } from './professor-course.service';
import { CreateProfessorCourseDto } from './dto/create-professor-course.dto';
export declare class ProfessorCourseController {
    private readonly professorCourseService;
    constructor(professorCourseService: ProfessorCourseService);
    createProfessorCourse(createProfessorCourseDto: CreateProfessorCourseDto): Promise<import("./professor-course.entity").ProfessorCourse>;
    getAllProfessorCourses(): Promise<import("./professor-course.entity").ProfessorCourse[]>;
    getProfessorCourse(professorId: string, courseId: string): Promise<import("./professor-course.entity").ProfessorCourse>;
    getProfessorCourses(professorId: string): Promise<import("./professor-course.entity").ProfessorCourse[]>;
    getCourseProfessors(courseId: string): Promise<import("./professor-course.entity").ProfessorCourse[]>;
    deleteProfessorCourse(professorId: string, courseId: string): Promise<{
        message: string;
    }>;
}
