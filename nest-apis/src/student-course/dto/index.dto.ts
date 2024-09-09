import {
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsDate,
  IsArray,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateStudentCourseDto {
  @IsNotEmpty()
  @IsUUID()
  studentId: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty() // Ensures the array is not empty
  @ArrayUnique() // Ensures all UUIDs in the array are unique
  @IsUUID('4', { each: true }) // Ensures each item in the array is a valid UUID
  courses: string[];

  @IsNotEmpty()
  @IsUUID()
  semesterId: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  enrollmentDate?: Date;
}

export class UpdateStudentCourseDto {
  @IsOptional()
  @IsUUID()
  semesterId?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  enrollmentDate?: Date;
}
