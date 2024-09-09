export declare class CreateStudentCourseDto {
    studentId: string;
    courses: string[];
    semesterId: string;
    enrollmentDate?: Date;
}
export declare class UpdateStudentCourseDto {
    semesterId?: string;
    enrollmentDate?: Date;
}
