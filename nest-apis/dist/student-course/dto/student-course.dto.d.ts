export declare class CreateStudentCourseDto {
    studentId: string;
    courseId: string;
    semesterId: string;
    enrollmentDate?: Date;
}
export declare class UpdateStudentCourseDto {
    studentId?: string;
    courseId?: string;
    semesterId?: string;
    enrollmentDate?: Date;
}
