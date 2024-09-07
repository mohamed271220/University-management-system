import { Model } from 'sequelize-typescript';
export declare class Semester extends Model<Semester> {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
    static uniqueNameIndex: void;
}
