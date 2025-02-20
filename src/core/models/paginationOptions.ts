import { ApiProperty } from '@nestjs/swagger';

export class PaginationOptions {
  @ApiProperty({
    type: String,
    description: 'identificacion',
    required: false,
  })
  identification?: string;
  @ApiProperty({
    type: String,
    description: 'nombre',
    required: false,
  })
  name?: string;
  @ApiProperty({
    type: String,
    description: 'email',
    required: false,
  })
  email?: string;
  @ApiProperty({ type: Date, description: 'fecha de inicio', required: false })
  dateStart?: Date;
  @ApiProperty({ type: Date, description: 'fecha de fin', required: false })
  dateEnd?: Date;
  @ApiProperty({ type: String, description: 'codigo', required: false })
  code?: string;
  @ApiProperty({
    type: Number,
    description: 'numero de la apgina',
    required: true,
  })
  page: number;
  @ApiProperty({
    type: Number,
    description: 'cantidad de registro por pagina',
    required: true,
  })
  limit: number;
}
