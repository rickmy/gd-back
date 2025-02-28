import { ApiProperty } from '@nestjs/swagger';
import { JsonValue } from '@prisma/client/runtime/library';

export class TemplateDocumentDto {
  @ApiProperty({
    description: 'Id del template',
    example: '1',
  })
  templateId: string;
  @ApiProperty({
    description: 'Nombre del template',
    example: 'OFICIO Básico',
  })
  name: string;
  @ApiProperty({
    description: 'Id del tipo de documento',
    example: '1',
  })
  typeDocId: string;
  @ApiProperty({
    description: 'Tipo de documento',
    example: 'Oficio',
  })
  typeDoc: string;
  @ApiProperty({
    description: 'Componentes del template',
    example: '{}',
  })
  components: JsonValue;
  @ApiProperty({
    description: 'Estado del template',
    example: true,
  })
  state: boolean;
}
