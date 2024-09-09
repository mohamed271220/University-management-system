import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDtoSignUp {
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
}

export class AuthCredentialsDtoLogin {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  password: string;
}
