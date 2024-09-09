import { IsOptional, IsEnum } from 'class-validator';

export class UpdateAttendanceDto {
  @IsEnum(['Present', 'Absent', 'Excused'])
  @IsOptional()
  status?: 'Present' | 'Absent' | 'Excused';
}
