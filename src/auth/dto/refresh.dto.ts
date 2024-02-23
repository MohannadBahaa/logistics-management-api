import { IsEmail, IsNotEmpty, IsString, isNotEmpty } from 'class-validator';

export class RefreshDto {
  @IsNotEmpty()
  refresh_token: string;
}
