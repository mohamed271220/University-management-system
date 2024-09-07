import {
  IsUUID,
  IsString,
  IsEnum,
  IsOptional,
  IsDateString,
  Matches,
} from 'class-validator';

export class UpdateLectureDTO {
  @IsUUID()
  @IsOptional()
  courseId?: string;

  @IsUUID()
  @IsOptional()
  professorId?: string;

  @IsUUID()
  @IsOptional()
  hallId?: string;

  @IsEnum([
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ])
  @IsOptional()
  dayOfWeek?:
    | 'Sunday'
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday';

  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'Invalid start time format',
  })
  @IsOptional()
  startTime?: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'Invalid end time format',
  })
  @IsOptional()
  endTime?: string;

  @IsString()
  @IsOptional()
  recurrencePattern?: string;

  @IsDateString()
  @IsOptional()
  recurrenceEndDate?: Date;
}
