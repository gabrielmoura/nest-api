import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserUnique } from '../validator/userUniqueValidator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @UserUnique({ message: 'Email em uso' })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
