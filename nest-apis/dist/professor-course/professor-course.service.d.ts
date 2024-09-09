import { ProfessorCourse } from './professor-course.entity';
import { User } from 'src/user/user.entity';
import { Course } from 'src/course/course.entity';
import { CreateProfessorCourseDto } from './dto/create-professor-course.dto';
export declare class ProfessorCourseService {
    private professorCourseModel;
    private professorModel;
    private courseModel;
    constructor(professorCourseModel: typeof ProfessorCourse, professorModel: typeof User, courseModel: typeof Course);
    createProfessorCourse(createProfessorCourseDto: CreateProfessorCourseDto): Promise<ProfessorCourse>;
    getAllProfessorCourses(): Promise<ProfessorCourse[]>;
    getProfessorCourse(professorId: string, courseId: string): Promise<ProfessorCourse>;
    getProfessorCourses(professorId: string): Promise<ProfessorCourse[]>;
    getCourseProfessors(courseId: string): Promise<ProfessorCourse[]>;
    deleteProfessorCourse(professorId: string, courseId: string): Promise<{
        message: string;
    }>;
}
