import { IsString, Matches, MaxLength, MinLength, IsIn } from 'class-validator';
import { Role } from 'src/shared/types';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  email: string;

  @IsIn(['Professor', 'Student', 'Admin', 'Staff'])
  role: Role;
}
