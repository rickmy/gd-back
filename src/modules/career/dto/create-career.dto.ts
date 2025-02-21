import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class CreateCareerDto {
  @ApiProperty({
    example: '1',
    description: 'Career code',
  })
  @IsString({ message: 'The code must be a string' })
  code: string;
  @ApiProperty({
    example: '1',
    description: 'Career code auth',
  })
  @IsString({ message: 'The code auth must be a string' })
  codeAuth: string;
  @ApiProperty({
    example: '1',
    description: 'Career resolution number',
  })
  @IsString({ message: 'The resolution number must be a string' })
  resolutionNumber: string;
  @ApiProperty({
    example: '1',
    description: 'Career name',
  })
  @IsString({ message: 'The name must be a string' })
  name: string;
  @ApiProperty({
    example: '1',
    description: 'Career title awarded',
  })
  @IsString({ message: 'The title awarded must be a string' })
  titleAwarded: string;
  @ApiProperty({
    example: '1',
    description: 'Career duration',
  })
  @IsBoolean({ message: 'The state must be a boolean' })
  state: boolean;
  @ApiProperty({
    example: '1',
    description: 'Career state',
  })
  @IsUUID('4', { message: 'The institute id must be a valid UUID' })
  instituteId: string;
  @ApiProperty({
    example: '1',
    description: 'Career modality id',
  })
  @IsUUID('4', { message: 'The modality id must be a valid UUID' })
  modalityId: string;
  @ApiProperty({
    example: '1',
    description: 'Career type career id',
  })
  @IsUUID('4', { message: 'The type career id must be a valid UUID' })
  typeCareerId: string;
}
