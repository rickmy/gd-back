import { ApiProperty } from '@nestjs/swagger';

export class CreateModalityDto {
  @ApiProperty({
    type: String,
    description: 'Modality name',
    required: true,
  })
  name: string;
  @ApiProperty({
    type: Boolean,
    description: 'Modality state',
    required: true,
  })
  state: boolean;
}
