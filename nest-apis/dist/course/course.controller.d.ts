import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    createCourse(createCourseDto: CreateCourseDto): Promise<import("./course.entity").Course>;
    getAllCourses(search: string, limit: number, offset: number): Promise<import("./course.entity").Course[]>;
    getCourse(courseId: string): Promise<import("./course.entity").Course>;
    getCourseLectures(courseId: string): Promise<import("../lecture/lecture.entity").Lecture[]>;
    updateCourse(courseId: string, updateCourseDto: UpdateCourseDto): Promise<import("./course.entity").Course>;
    deleteCourse(courseId: string): Promise<void>;
}
