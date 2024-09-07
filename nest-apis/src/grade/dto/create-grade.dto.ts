import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsOptional,
IsISO8601,
  IsDateString,
  Length,
} from 'class-validator';

export class CreateGradeDTO {
  @IsUUID()
  @IsNotEmpty()
  studentId: string;

  @IsUUID()
  @IsNotEmpty()
  courseId: string;

  @IsUUID()
  @IsNotEmpty()
  semesterId: string;

  @IsString()
  @Length(1, 2, { message: 'Grade must be 1 or 2 characters long' })
  @IsNotEmpty()
  grade: string;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsOptional()
  description?: string;
}
