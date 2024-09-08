import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateSemesterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;
}
