import { IsUUID, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateDepartmentYearCourseDto {
  @IsUUID()
  @IsNotEmpty()
  departmentId: string;

  @IsUUID()
  @IsNotEmpty()
  courseId: string;

  @IsEnum(['1st Year', '2nd Year', '3rd Year', '4th Year'])
  @IsNotEmpty()
  year: '1st Year' | '2nd Year' | '3rd Year' | '4th Year';
}
