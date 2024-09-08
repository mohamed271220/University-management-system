import { IsUUID, IsOptional } from 'class-validator';

export class UpdateProfessorCourseDto {
  @IsUUID()
  @IsOptional()
  professorId?: string;

  @IsUUID()
  @IsOptional()
  courseId?: string;
}
