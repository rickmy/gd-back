import { ApiProperty } from '@nestjs/swagger';

export class TypeCareerDto {
  @ApiProperty({
    type: String,
    description: 'The id of the type career',
  })
  typeCareerId: string;
  @ApiProperty({
    type: String,
    description: 'The name of the type career',
  })
  name: string;
  @ApiProperty({
    type: Boolean,
    description: 'The state of the type career',
  })
  state: boolean;
}
