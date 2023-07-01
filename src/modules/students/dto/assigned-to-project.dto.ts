import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class AssignedToProjectDto {
  @IsNumber()
  @ApiProperty({ description: 'id estudiante', example: '1' })
  idStudent: number
  @IsNumber()
  @ApiProperty({ description: 'id empresa', example: '1' })
  idProject: number;
}