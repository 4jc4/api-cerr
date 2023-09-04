import {
  IsString,
  IsEmail,
  IsStrongPassword,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Role } from '../../enums/role.enum';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 8,
  })
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role: string;
}
