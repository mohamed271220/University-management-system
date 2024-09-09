import { Model } from 'sequelize-typescript';
import { Department } from '../department/department.entity';
export declare class Hall extends Model<Hall> {
    id: string;
    name: string;
    isLab: boolean;
    departmentId?: string;
    department: Department;
}
