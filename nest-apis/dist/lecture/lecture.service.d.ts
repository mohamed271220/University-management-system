import { Lecture } from './lecture.entity';
import { User } from 'src/user/user.entity';
import { Attendance } from 'src/attendance/attendance.entity';
import { LectureHistory } from 'src/lecture-history/lecture-history.entity';
import { CreateLectureDTO } from './dto/create-lecture.dto';
import { Course } from 'src/course/course.entity';
import { Hall } from 'src/hall/hall.entity';
import { UpdateLectureDTO } from './dto/update-lecture.dto';
export declare class LectureService {
    private readonly lectureModel;
    private readonly userModel;
    private readonly attendanceModel;
    private readonly lectureHistoryModel;
    private readonly courseModel;
    private readonly hallModel;
    constructor(lectureModel: typeof Lecture, userModel: typeof User, attendanceModel: typeof Attendance, lectureHistoryModel: typeof LectureHistory, courseModel: typeof Course, hallModel: typeof Hall);
    createLecture(createLectureDto: CreateLectureDTO): Promise<Lecture>;
    getAllLectures(search?: string, limit?: number, offset?: number): Promise<{
        lectures: Lecture[];
        pagination: any;
    }>;
    getLectureById(id: string): Promise<Lecture>;
    getLectureAttendance(lectureId: string): Promise<Attendance[]>;
    getLectureArchived(lectureId: string): Promise<LectureHistory[]>;
    updateLecture(lectureId: string, updateLectureDto: UpdateLectureDTO): Promise<Lecture>;
    deleteLecture(lectureId: string): Promise<Lecture>;
}
