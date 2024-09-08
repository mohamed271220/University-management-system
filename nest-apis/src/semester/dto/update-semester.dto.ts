import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateSemesterDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsDateString()
  @IsOptional()
  startDate?: Date;

  @IsDateString()
  @IsOptional()
  endDate?: Date;
}
