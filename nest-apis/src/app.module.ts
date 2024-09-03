import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CourseCacheModule } from './course-cache/course-cache.module';
import { CourseCache } from './entities/course-cache.entity';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Attendance } from './entities/attendance.entity';
import { Grade } from './entities/grade.entity';
import { ProfessorCourse } from './entities/professor-course.entity';
import { StudentCourse } from './entities/student-course.entity';
import { StudentYear } from './entities/student-year.entity';
import { Lecture } from './entities/lecture.entity';
import { Semester } from './entities/semester.entity';
import { LectureHistory } from './entities/lecture-history.entity';
import { Department } from './entities/department.entity';
import { DepartmentYearCourses } from './entities/department-year-courses.entity';
import { Hall } from './entities/hall.entity';
import { AuditLog } from './entities/audit-log.entity';
import { Course } from './entities/course.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [
        User,
        CourseCache,
        Profile,
        Attendance,
        Grade,
        ProfessorCourse,
        StudentCourse,
        StudentYear,
        Lecture,
        Semester,
        LectureHistory,
        Department,
        DepartmentYearCourses,
        StudentCourse,
        Hall,
        AuditLog,
        Course,
      ],
    }),
    CourseCacheModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
