import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class AssignedToCompanyDto {
  @IsNumber()
  @ApiProperty({ description: 'id empresa', example: '1' })
  idCompany: number
  @IsNumber()
  @ApiProperty({ description: 'id estudiante', example: '1' })
  idStudent: number
}