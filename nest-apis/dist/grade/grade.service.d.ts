import { Course } from 'src/course/course.entity';
import { Semester } from 'src/entities/semester.entity';
import { User } from 'src/user/user.entity';
import { Grade } from './grade.entity';
import { CreateGradeDTO } from './dto/create-grade.dto';
import { StudentCourse } from 'src/student-course/student-course.entity';
import { ProfessorCourse } from 'src/entities/professor-course.entity';
import { UpdateGradeDTO } from './dto/update-grade.dto';
export declare class GradeService {
    private readonly gradeModel;
    private readonly userModel;
    private readonly semesterModel;
    private readonly courseModel;
    private readonly studentCourseModel;
    private readonly professorCourseModel;
    constructor(gradeModel: typeof Grade, userModel: typeof User, semesterModel: typeof Semester, courseModel: typeof Course, studentCourseModel: typeof StudentCourse, professorCourseModel: typeof ProfessorCourse);
    createGrade(user: User, createGradeDto: CreateGradeDTO): Promise<Grade>;
    getAllGrades(search: string, limit: number, offset: number): Promise<{
        grades: Grade[];
        pagination: any;
    }>;
    getGradeById(gradeId: string): Promise<Grade>;
    getGradesByStudent(studentId: string): Promise<Grade[]>;
    getGradesByStudentAndSemester(studentId: string, semesterId: string): Promise<Grade[]>;
    getGradesByCourse(courseId: string): Promise<Grade[]>;
    getGradesBySemester(semesterId: string): Promise<Grade[]>;
    getGradesByProfessor(professorId: string): Promise<Grade[]>;
    updateGrade(gradeId: string, updateGradeDto: UpdateGradeDTO, user: User): Promise<Grade>;
    deleteGrade(gradeId: string): Promise<void>;
}
