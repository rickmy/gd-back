import { IsNotEmpty, Length } from "class-validator";

export class ChangePasswordDto {


  @IsNotEmpty()
  @Length(6, 20)
  oldPassword: String;
  
  @IsNotEmpty()
  @Length(6, 20)
  newPassword: String;

}