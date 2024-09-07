import { Model } from 'sequelize-typescript';
export declare class ProfessorCourse extends Model<ProfessorCourse> {
    professorId: string;
    courseId: string;
    static uniqueIndex: void;
}
