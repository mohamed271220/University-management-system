import { IsString, IsUUID, IsOptional } from 'class-validator';

export class UpdateDepartmentDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  code?: string;
}
