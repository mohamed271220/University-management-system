import { Model } from 'sequelize-typescript';
export declare class CourseCache extends Model<CourseCache> {
    courseId: string;
    courseName?: string;
    departmentName?: string;
    professorName?: string;
    cachedAt?: Date;
}
