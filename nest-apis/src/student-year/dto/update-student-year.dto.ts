import { IsUUID, IsOptional, IsEnum, IsDateString } from 'class-validator';

export class UpdateStudentYearDto {
  @IsUUID()
  @IsOptional()
  studentId?: string;

  @IsEnum(['1st Year', '2nd Year', '3rd Year', '4th Year'])
  @IsOptional()
  year?: '1st Year' | '2nd Year' | '3rd Year' | '4th Year';

  @IsUUID()
  @IsOptional()
  departmentId?: string;

  @IsDateString()
  @IsOptional()
  effectiveDate?: Date;
}
