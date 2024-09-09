import { IsString, IsUUID, IsBoolean, IsOptional } from 'class-validator';

export class UpdateHallDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsBoolean()
  @IsOptional()
  isLab?: boolean;

  @IsUUID()
  @IsOptional()
  departmentId?: string;
}
