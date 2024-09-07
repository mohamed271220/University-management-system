import {
  IsUUID,
  IsString,
  IsOptional,
  IsDateString,
  Length,
} from 'class-validator';

export class UpdateGradeDTO {
  @IsUUID()
  @IsOptional()
  studentId?: string;

  @IsUUID()
  @IsOptional()
  courseId?: string;

  @IsUUID()
  @IsOptional()
  semesterId?: string;

  @IsString()
  @Length(1, 2, { message: 'Grade must be 1 or 2 characters long' })
  @IsOptional()
  grade?: string;

  @IsDateString()
  @IsOptional()
  date?: Date;

  @IsString()
  @IsOptional()
  description?: string;
}
