import { ApiProperty } from '@nestjs/swagger';

export class TypeDocumentDto {
  @ApiProperty({
    description: 'Identificador único del tipo de documento',
    example: '1',
  })
  typeDocumentId: string;
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
