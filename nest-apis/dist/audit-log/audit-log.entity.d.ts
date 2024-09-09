import { Model } from 'sequelize-typescript';
import { User } from '../user/user.entity';
export declare class AuditLog extends Model<AuditLog> {
    id: string;
    tableName: string;
    recordId: string;
    action: 'INSERT' | 'UPDATE' | 'DELETE';
    oldData?: Record<string, any>;
    newData?: Record<string, any>;
    changedAt?: Date;
    changedBy?: string;
    user?: User;
}
