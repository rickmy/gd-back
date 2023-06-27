import { ApiProperty } from "@nestjs/swagger";

export class PaginationResult<T> {
  @ApiProperty({ example: [], description: 'Resultados' })
  results: T[];
  @ApiProperty({ example: 1, description: 'Total de resultados' })
  total?: number;
  @ApiProperty({ example: 1, description: 'Página actual' })
  page?: number;
  @ApiProperty({ example: 1, description: 'Total de páginas' })
  limit?: number;
}
