import {
  IsString,
  IsUUID,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class CreateHallDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  isLab: boolean;

  @IsUUID()
  @IsOptional()
  departmentId?: string;
}
