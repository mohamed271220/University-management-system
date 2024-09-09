import { Course } from 'src/course/course.entity';
import { Hall } from 'src/hall/hall.entity';
import { Lecture } from 'src/lecture/lecture.entity';
import { User } from 'src/user/user.entity';
export interface LectureWithRelations extends Lecture {
    course: Course;
    professor: User;
    hall: Hall;
}
