import { ApiProperty } from '@nestjs/swagger';

export class CreateTypeCareerDto {
  @ApiProperty({
    description: 'Name of the type career',
    type: String,
    required: true,
  })
  name: string;
  @ApiProperty({
    description: 'State of the type career',
    type: Boolean,
    required: true,
  })
  state: boolean;
}
