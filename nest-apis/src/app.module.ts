import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CourseCacheModule } from './course-cache/course-cache.module';
import { CourseCache } from './course-cache/course-cache.entity';
import { User } from './user/user.entity';
import { Profile } from './profile/profile.entity';
import { Attendance } from './attendance/attendance.entity';
import { Grade } from './grade/grade.entity';
import { ProfessorCourse } from './professor-course/professor-course.entity';
import { StudentCourse } from './student-course/student-course.entity';
import { StudentYear } from './student-year/student-year.entity';
import { Lecture } from './lecture/lecture.entity';
import { Semester } from './semester/semester.entity';
import { LectureHistory } from './lecture-history/lecture-history.entity';
import { Department } from './department/department.entity';
import { DepartmentYearCourses } from './department-year-courses/department-year-courses.entity';
import { Hall } from './hall/hall.entity';
import { AuditLog } from './audit-log/audit-log.entity';
import { Course } from './course/course.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { TimetableModule } from './timetable/timetable.module';
import { StudentYearModule } from './student-year/student-year.module';
import { StudentCourseModule } from './student-course/student-course.module';
import { ProfessorCourseModule } from './professor-course/professor-course.module';
import { HallModule } from './hall/hall.module';
import { GradeModule } from './grade/grade.module';
import { DepartmentYearCoursesModule } from './department-year-courses/department-year-courses.module';
import { LectureModule } from './lecture/lecture.module';
import { DepartmentModule } from './department/department.module';
import { CourseModule } from './course/course.module';
import { ProfileModule } from './profile/profile.module';
import { SemesterModule } from './semester/semester.module';
import { AttendanceModule } from './attendance/attendance.module';
import { AuditLogModule } from './audit-log/audit-log.module';
import { LectureHistoryModule } from './lecture-history/lecture-history.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema, // validate the configuration (to determine which variables are required)
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('STAGE') === 'prod';
        return {
          dialect: 'postgres',
          host: configService.get('DB_HOST'),
          port: Number(configService.get('DB_PORT')),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PWD'),
          database: configService.get('DB_NAME'),
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
            Hall,
            AuditLog,
            Course,
          ],
          logging: console.log, // Enable detailed logging
          dialectOptions: isProduction
            ? {
                ssl: {
                  require: true,
                  rejectUnauthorized: false, // This ensures that SSL works even with self-signed certificates
                },
              }
            : {},
          synchronize: true, // Auto-create tables based on your models (use with caution in production)
        };
      },
    }),
    AuthModule,
    UserModule,
    CourseCacheModule,
    UserModule,
    ProfileModule,
    CourseModule,
    DepartmentModule,
    LectureModule,
    DepartmentYearCoursesModule,
    GradeModule,
    HallModule,
    ProfessorCourseModule,
    StudentCourseModule,
    StudentYearModule,
    TimetableModule,
    SemesterModule,
    AttendanceModule,
    AuditLogModule,
    LectureHistoryModule,
  ],
})
export class AppModule {}
