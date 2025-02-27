import { ApiProperty } from '@nestjs/swagger';

export class PaginationOptions {
  @ApiProperty({
    type: Number,
    description: 'numero de la página',
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
