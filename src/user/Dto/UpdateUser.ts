import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserUnique } from '../validator/userUniqueValidator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @UserUnique({ message: 'Email em uso' })
  @IsOptional()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsOptional()
  password: string;
}
