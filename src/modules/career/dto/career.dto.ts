import { ApiProperty } from '@nestjs/swagger';

export class CareerDto {
  @ApiProperty({
    example: '1',
    description: 'Career id',
  })
  careerId: string;
  @ApiProperty({
    example: '1',
    description: 'Career code',
  })
  code: string;
  @ApiProperty({
    example: '1',
    description: 'Career code auth',
  })
  codeAuth: string;
  @ApiProperty({
    example: '1',
    description: 'Career resolution number',
  })
  resolutionNumber: string;
  @ApiProperty({
    example: '1',
    description: 'Career name',
  })
  name: string;
  @ApiProperty({
    example: '1',
    description: 'Career title awarded',
  })
  titleAwarded: string;
  @ApiProperty({
    example: '1',
    description: 'Career duration',
  })
  state: boolean;
  @ApiProperty({
    example: '1',
    description: 'Career state',
  })
  instituteId: string;
  @ApiProperty({
    example: '1',
    description: 'Career institute',
  })
  institute: string;
  @ApiProperty({
    example: '1',
    description: 'Career modality id',
  })
  modalityId: string;
  @ApiProperty({
    example: '1',
    description: 'Career modality',
  })
  modality: string;
  @ApiProperty({
    example: '1',
    description: 'Career type career id',
  })
  typeCareerId: string;
  @ApiProperty({
    example: '1',
    description: 'Career type career',
  })
  typeCareer: string;
}
