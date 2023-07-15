import { ApiProperty } from "@nestjs/swagger";

export class PaginationOptions {
  @ApiProperty({ type: 'string', description: 'identificacion del usuario', required: false })
  identification?: string;
  @ApiProperty({ type: 'string', description: 'nombre del usuario', required: false })
  name?: string;
  @ApiProperty({ type: 'string', description: 'email del usuario', required: false })
  email?: string;
  @ApiProperty({ type: Number, description: 'numero de la apgina', required: true })
  page: number;
  @ApiProperty({ type: Number, description: 'cantidad de registro por pagina', required: true })
  limit: number;
}
