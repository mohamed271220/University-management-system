import {
  IsString,
  IsNotEmpty,
  IsISO8601,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsISO8601()
  dob: Date;

  @IsString()
  @Length(10)
  contactNumber: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  firstName?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  lastName?: string;

  @IsISO8601()
  @IsOptional()
  dob?: Date;

  @IsString()
  @IsOptional()
  @Length(10)
  contactNumber?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  address?: string;
}
