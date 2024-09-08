import { Model } from 'sequelize-typescript';
export declare class LectureHistory extends Model<LectureHistory> {
    id: string;
    lectureId: string;
    courseId: string;
    professorId: string;
    hallId: string;
    dayOfWeek?: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
    startTime?: string;
    endTime?: string;
    action: 'Created' | 'Updated' | 'Deleted' | 'Archived';
    timestamp?: Date;
}
