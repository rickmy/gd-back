import { ApiProperty } from '@nestjs/swagger';

export class ModalityDto {
  @ApiProperty({
    type: String,
    description: 'Modality id',
    required: true,
  })
  modalityId: string;
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
