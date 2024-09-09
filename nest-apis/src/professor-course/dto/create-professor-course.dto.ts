import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateProfessorCourseDto {
  @IsUUID()
  @IsNotEmpty()
  professorId: string;

  @IsUUID()
  @IsNotEmpty()
  courseId: string;
}
