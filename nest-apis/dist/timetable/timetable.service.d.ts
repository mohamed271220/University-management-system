import { Course } from 'src/course/course.entity';
import { Department } from 'src/department/department.entity';
import { Hall } from 'src/hall/hall.entity';
import { ProfessorCourse } from 'src/professor-course/professor-course.entity';
import { Semester } from 'src/semester/semester.entity';
import { StudentCourse } from 'src/student-course/student-course.entity';
import { User } from 'src/user/user.entity';
import { Lecture } from 'src/lecture/lecture.entity';
import { DepartmentYearCourses } from 'src/department-year-courses/department-year-courses.entity';
export declare enum Year {
    '1st Year' = "1st Year",
    '2nd Year' = "2nd Year",
    '3rd Year' = "3rd Year",
    '4th Year' = "4th Year"
}
export declare class TimetableService {
    private userModel;
    private courseModel;
    private departmentModel;
    private semesterModel;
    private hallModel;
    private studentCourseModel;
    private professorCourseModel;
    private lectureModel;
    private departmentYearCoursesModel;
    constructor(userModel: typeof User, courseModel: typeof Course, departmentModel: typeof Department, semesterModel: typeof Semester, hallModel: typeof Hall, studentCourseModel: typeof StudentCourse, professorCourseModel: typeof ProfessorCourse, lectureModel: typeof Lecture, departmentYearCoursesModel: typeof DepartmentYearCourses);
    private buildTimetable;
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
