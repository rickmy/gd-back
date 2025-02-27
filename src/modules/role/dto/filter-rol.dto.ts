import { PaginationOptions } from '@core/models/paginationOptions';
import { ApiProperty } from '@nestjs/swagger';

export class FilterRolDto extends PaginationOptions {
  @ApiProperty({
    type: String,
    description: 'codigo',
    required: false,
  })
  code?: string;
  @ApiProperty({
    type: String,
    description: 'nombre',
    required: false,
  })
  name?: string;
  @ApiProperty({
    type: Boolean,
    description: 'estado',
    required: false,
  })
  state?: boolean;
}
