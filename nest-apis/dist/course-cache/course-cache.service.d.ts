import { CourseCache } from '../entities/course-cache.entity';
import { CreateCourseCacheDto, UpdateCourseCacheDto } from './dto';
export declare class CourseCacheService {
    private readonly courseCacheModel;
    constructor(courseCacheModel: typeof CourseCache);
    create(createCourseCacheDto: CreateCourseCacheDto): Promise<CourseCache>;
    findAll(): Promise<CourseCache[]>;
    findOne(courseId: string): Promise<CourseCache>;
    update(courseId: string, updateCourseCacheDto: UpdateCourseCacheDto): Promise<CourseCache>;
    remove(courseId: string): Promise<void>;
}
