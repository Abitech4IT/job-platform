import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateJobDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(50, { message: 'Title must not exceed 50 characters' })
  title?: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsNotEmpty({ message: 'Company is required' })
  @IsString({ message: 'Company must be a string' })
  company: string;

  @IsNotEmpty({ message: 'Type is required' })
  @IsString({ message: 'Type must be a string' })
  type?: string;

  @IsNotEmpty({ message: 'Tags are required' })
  @IsArray({ message: 'Tags must be an array' })
  @IsString({ each: true, message: 'Each tag must be a string' })
  tags?: string[];

  @IsNotEmpty({ message: 'Location is required' })
  @IsString({ message: 'Location must be a string' })
  location: string;

  @IsNotEmpty({ message: 'Salary is required' })
  @IsNumber({}, { message: 'Salary must be a number' })
  salary?: number;
}
