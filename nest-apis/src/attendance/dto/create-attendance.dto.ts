import {
  IsUUID,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateAttendanceDto {
  @IsUUID()
  @IsNotEmpty()
  studentId: string;

  @IsUUID()
  @IsNotEmpty()
  lectureId: string;

  @IsEnum(['Present', 'Absent', 'Excused'])
  @IsNotEmpty()
  status: 'Present' | 'Absent' | 'Excused';

  @IsDateString()
  @IsOptional()
  lectureDate?: Date;
}
