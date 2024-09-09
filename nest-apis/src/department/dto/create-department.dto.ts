import { IsString, IsUUID, IsNotEmpty } from 'class-validator';

export class CreateDepartmentDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
