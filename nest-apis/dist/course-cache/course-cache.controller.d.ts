import { CourseCacheService } from './course-cache.service';
import { CreateCourseCacheDto, UpdateCourseCacheDto } from './dto';
import { CourseCache } from '../entities/course-cache.entity';
export declare class CourseCacheController {
    private readonly courseCacheService;
    constructor(courseCacheService: CourseCacheService);
    create(createCourseCacheDto: CreateCourseCacheDto): Promise<CourseCache>;
    findAll(): Promise<CourseCache[]>;
    findOne(courseId: string): Promise<CourseCache>;
    update(courseId: string, updateCourseCacheDto: UpdateCourseCacheDto): Promise<CourseCache>;
    remove(courseId: string): Promise<void>;
}
