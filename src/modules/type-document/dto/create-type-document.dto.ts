import { ApiProperty } from '@nestjs/swagger';

export class CreateTypeDocumentDto {
  @ApiProperty({
    description: 'Nombre del tipo de documento',
    example: 'Oficio',
  })
  name: string;
  @ApiProperty({
    description: 'Estado del tipo de documento',
    example: true,
  })
  state: boolean;
}
