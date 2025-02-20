import { ApiProperty } from '@nestjs/swagger';
import { PaginationOptions } from 'src/core/models/paginationOptions';

export class FilterInstituteDto extends PaginationOptions {
  @ApiProperty({
    type: String,
    description: 'codigo',
    required: false,
  })
  codeAuth?: string;
}
