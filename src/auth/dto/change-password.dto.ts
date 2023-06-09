import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ChangePasswordDto {

  @IsNumber()
  userId: number;

  @IsNotEmpty()
  //@Length(6, 20)
  @IsString()
  currentPassword: string;
  
  @IsNotEmpty()
  //@Length(6, 20)
  @IsString()
  newPassword: string;

}