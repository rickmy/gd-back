import { ApiProperty } from '@nestjs/swagger';
import { JsonValue } from '@prisma/client/runtime/library';
import { IsBoolean, IsJSON, IsString, IsUUID } from 'class-validator';

export class CreateTemplateDocumentDto {
  @ApiProperty({
    description: 'Nombre del template',
    example: 'Oficio Básico',
  })
  @IsString({
    message: 'Debe ser un string',
  })
  name: string;
  @ApiProperty({
    description: 'Id del tipo de documento',
    example: '1',
  })
  @IsUUID('4', {
    message: 'Debe ser un UUID',
  })
  typeDocId: string;
  @ApiProperty({
    description: 'Componentes del template',
    example: '{}',
  })
  @IsJSON({
    message: 'Debe ser un JSON',
  })
  components: JsonValue;
  @ApiProperty({
    description: 'Estado del template',
    example: true,
  })
  @IsBoolean({
    message: 'Debe ser un boolean',
  })
  state: boolean;
}
