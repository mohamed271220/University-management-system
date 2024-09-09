import { IsUUID, IsOptional, IsEnum } from 'class-validator';

export class UpdateDepartmentYearCourseDto {
  @IsUUID()
  @IsOptional()
  departmentId?: string;

  @IsUUID()
  @IsOptional()
  courseId?: string;

  @IsEnum(['1st Year', '2nd Year', '3rd Year', '4th Year'])
  @IsOptional()
  year?: '1st Year' | '2nd Year' | '3rd Year' | '4th Year';
}
