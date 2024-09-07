import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  credits: number;

  @IsUUID()
  departmentId: string;

  @IsUUID()
  professorId: string;
}
