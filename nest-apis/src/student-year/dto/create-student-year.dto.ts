import { IsUUID, IsNotEmpty, IsEnum, IsDateString } from 'class-validator';

export class CreateStudentYearDto {
  @IsUUID()
  @IsNotEmpty()
  studentId: string;

  @IsEnum(['1st Year', '2nd Year', '3rd Year', '4th Year'])
  @IsNotEmpty()
  year: '1st Year' | '2nd Year' | '3rd Year' | '4th Year';

  @IsUUID()
  @IsNotEmpty()
  departmentId: string;

  @IsDateString()
  @IsNotEmpty()
  effectiveDate: Date;
}
