import { PaginationOptions } from '@core/models/paginationOptions';
import { ApiProperty } from '@nestjs/swagger';

export class FilterCareerDto extends PaginationOptions {
  @ApiProperty({
    type: String,
    description: 'code authorization',
    required: false,
  })
  codeAuth?: string;
  @ApiProperty({
    type: String,
    description: 'resolution number',
    required: false,
  })
  resolutionNumber?: string;
  @ApiProperty({
    type: String,
    description: 'institute name',
    required: false,
  })
  institute?: string;
  @ApiProperty({
    type: String,
    description: 'modality name',
    required: false,
  })
  modality?: string;
  @ApiProperty({
    type: String,
    description: 'type career name',
    required: false,
  })
  typeCareer?: string;
}
