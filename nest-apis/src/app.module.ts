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
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/role.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';

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
          password: configService.get('DB_PASSWORD'),
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
    CourseCacheModule,
    AuthModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
