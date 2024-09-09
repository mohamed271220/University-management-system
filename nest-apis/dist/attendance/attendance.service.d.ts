import { Attendance } from './attendance.entity';
import { Lecture } from 'src/lecture/lecture.entity';
import { User } from 'src/user/user.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { StudentCourse } from 'src/student-course/student-course.entity';
import { Hall } from 'src/hall/hall.entity';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
export declare class AttendanceService {
    private attendanceModel;
    private lectureModel;
    private userModel;
    private studentCourseModel;
    private hallModel;
    constructor(attendanceModel: typeof Attendance, lectureModel: typeof Lecture, userModel: typeof User, studentCourseModel: typeof StudentCourse, hallModel: typeof Hall);
    createAttendance(createAttendanceDto: CreateAttendanceDto, user: User): Promise<Attendance>;
    getAllAttendance(limit: number, offset: number): Promise<{
        pagination: {
            totalItems: number;
            itemsPerPage: number;
            currentPage: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            nextPage: number;
            previousPage: number;
        };
        attendance: Attendance[];
    }>;
    getAttendance(attendanceId: string): Promise<Attendance>;
    getStudentAttendance(studentId: string, user: User): Promise<Attendance[]>;
    getLectureAttendance(lectureId: string): Promise<Attendance[]>;
    getLectureStudentAttendance(lectureId: string, studentId: string): Promise<Attendance[]>;
    updateAttendanceStatus(attendanceId: string, updateAttendanceDto: UpdateAttendanceDto): Promise<Attendance>;
    deleteAttendance(attendanceId: string): Promise<{
        message: string;
    }>;
}
