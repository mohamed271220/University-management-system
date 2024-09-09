import { TimetableService, Year } from './timetable.service';
export declare class TimetableController {
    private readonly timetableService;
    constructor(timetableService: TimetableService);
    getStudentTimetable(studentId: string, semesterId: string): Promise<{
        dayOfWeek: "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
        startTime: string;
        endTime: string;
        course: string;
        professor: string;
        hall: string;
    }[]>;
    getProfessorTimetable(professorId: string): Promise<any>;
    getDepartmentTimetable(departmentId: string): Promise<any>;
    getHallTimetable(hallId: string): Promise<any>;
    getStudentYearTimetable(departmentId: string, year: Year): Promise<{
        dayOfWeek: "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
        startTime: string;
        endTime: string;
        course: string;
        professor: string;
        hall: string;
    }[]>;
}
