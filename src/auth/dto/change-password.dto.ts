import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsNumber({}, { message: 'El campo debe ser numérico' })
  @ApiProperty({
    description: 'Id del usuario',
    example: '12121212',
  })
  userId: string;
  @IsString({ message: 'El campo debe ser string' })
  @ApiProperty({
    description: 'actual contraseña del usuario',
    example: '12345678',
  })
  currentPassword: string;
  @IsString({ message: 'El campo debe ser string' })
  @ApiProperty({
    description: 'Nueva contraseña del usuario',
    example: '12345678',
  })
  newPassword: string;
}
