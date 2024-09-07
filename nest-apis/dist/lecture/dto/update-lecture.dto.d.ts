export declare class UpdateLectureDTO {
    courseId?: string;
    professorId?: string;
    hallId?: string;
    dayOfWeek?: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
    startTime?: string;
    endTime?: string;
    recurrencePattern?: string;
    recurrenceEndDate?: Date;
}
