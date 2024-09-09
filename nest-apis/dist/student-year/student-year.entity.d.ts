import { Model } from 'sequelize-typescript';
export declare class StudentYear extends Model<StudentYear> {
    id: string;
    studentId: string;
    year: '1st Year' | '2nd Year' | '3rd Year' | '4th Year';
    effectiveDate: Date;
    departmentId: string;
    createdAt?: Date;
    updatedAt?: Date;
}
