import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsJSON, IsString } from 'class-validator';

export class CreateDocumentComponentDto {
  @ApiProperty({
    description: 'name of the document component',
    type: String,
    example: 'editor Component',
  })
  @IsString({
    message: 'name must be a string',
  })
  name: string;
  @ApiProperty({
    description: 'content of the document component',
    type: String,
    example: 'editor Component',
  })
  @IsString({
    message: 'content must be a string',
  })
  content: string;
  @ApiProperty({
    description: 'position of the document component',
    type: JSON,
    example: { x: 0, y: 0 },
  })
  @IsString({
    message: 'position must be a string',
  })
  position: string;
  @ApiProperty({
    description: 'state of the document component',
    type: Boolean,
    example: true,
  })
  @IsBoolean({
    message: 'state must be a boolean',
  })
  state: boolean;
}
