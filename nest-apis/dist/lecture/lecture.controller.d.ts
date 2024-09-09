import { LectureService } from './lecture.service';
import { CreateLectureDTO } from './dto/create-lecture.dto';
import { UpdateLectureDTO } from './dto/update-lecture.dto';
export declare class LectureController {
    private readonly lectureService;
    constructor(lectureService: LectureService);
    createLecture(createLectureDto: CreateLectureDTO): Promise<import("./lecture.entity").Lecture>;
    getAllLectures(search: string, limit: number, offset: number): Promise<{
        lectures: import("./lecture.entity").Lecture[];
        pagination: any;
    }>;
    getLecture(lectureId: string): Promise<import("./lecture.entity").Lecture>;
    getLectureAttendance(lectureId: string): Promise<import("../attendance/attendance.entity").Attendance[]>;
    getLectureArchived(lectureId: string): Promise<import("../lecture-history/lecture-history.entity").LectureHistory[]>;
    updateLecture(lectureId: string, updateLectureDto: UpdateLectureDTO): Promise<import("./lecture.entity").Lecture>;
    deleteLecture(lectureId: string): Promise<import("./lecture.entity").Lecture>;
}
