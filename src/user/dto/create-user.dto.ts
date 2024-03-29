import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  Matches,
} from 'class-validator';
import { errorMessages } from 'src/constants/error.messages';
import { role } from 'src/constants/role.options';

export class CreateUserDto {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/, {
    message: errorMessages?.passwordRequirements?.message,
  })
  password: string;

  @IsOptional()
  @IsIn(role?.options)
  role?: string;
}
