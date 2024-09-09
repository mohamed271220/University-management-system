import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsDateString,
  Matches,
} from 'class-validator';

export class CreateLectureDTO {
  @IsUUID()
  @IsNotEmpty()
  courseId: string;

  @IsUUID()
  @IsNotEmpty()
  professorId: string;

  @IsUUID()
  @IsNotEmpty()
  hallId: string;

  @IsEnum([
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ])
  @IsNotEmpty()
  dayOfWeek:
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
  @IsNotEmpty()
  startTime: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'Invalid end time format',
  })
  @IsNotEmpty()
  endTime: string;

  @IsString()
  @IsOptional()
  recurrencePattern?: string;

  @IsDateString()
  @IsOptional()
  recurrenceEndDate?: Date;
}
