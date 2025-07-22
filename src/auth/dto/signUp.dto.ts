import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty({ message: 'First name is required' })
  @IsString({ message: 'First name must be a string' })
  @MinLength(3, { message: 'First name must be at least 3 characters long' })
  @MaxLength(50, { message: 'First name must not exceed 50 characters' })
  firstName: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({ message: 'First name must be a string' })
  @MinLength(3, { message: 'First name must be at least 3 characters long' })
  @MaxLength(50, { message: 'First name must not exceed 50 characters' })
  lastName: string;

  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
