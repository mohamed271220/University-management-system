import { Course } from 'src/course/course.entity';
import { Department } from '../department/department.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { User } from 'src/user/user.entity';
import { Lecture } from 'src/lecture/lecture.entity';
import { UpdateCourseDto } from './dto/update-course.dto';
export declare class CourseService {
    private courseModel;
    private departmentModel;
    private userModel;
    private lectureModel;
    constructor(courseModel: typeof Course, departmentModel: typeof Department, userModel: typeof User, lectureModel: typeof Lecture);
    createCourse(createCourseDto: CreateCourseDto): Promise<Course>;
    getAllCourses(search?: string, limit?: number, offset?: number): Promise<Course[]>;
    getCourseById(id: string): Promise<Course>;
    getCourseLectures(courseId: string): Promise<Lecture[]>;
    updateCourse(courseId: string, updateCourseDto: UpdateCourseDto): Promise<Course>;
    deleteCourse(courseId: string): Promise<void>;
}
