export declare class CreateAttendanceDto {
    studentId: string;
    lectureId: string;
    status: 'Present' | 'Absent' | 'Excused';
    lectureDate?: Date;
}
