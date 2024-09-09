import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { User } from 'src/user/user.entity';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    createAttendance(createAttendanceDto: CreateAttendanceDto, user: User): Promise<import("./attendance.entity").Attendance>;
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
        attendance: import("./attendance.entity").Attendance[];
    }>;
    getAttendance(attendanceId: string): Promise<import("./attendance.entity").Attendance>;
    getStudentAttendance(studentId: string, user: User): Promise<import("./attendance.entity").Attendance[]>;
    getLectureAttendance(lectureId: string): Promise<import("./attendance.entity").Attendance[]>;
    getLectureStudentAttendance(lectureId: string, studentId: string): Promise<import("./attendance.entity").Attendance[]>;
    updateAttendanceStatus(attendanceId: string, updateAttendanceDto: UpdateAttendanceDto): Promise<import("./attendance.entity").Attendance>;
    deleteAttendance(attendanceId: string): Promise<{
        message: string;
    }>;
}
