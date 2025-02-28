import { ApiProperty } from '@nestjs/swagger';
import { JsonValue } from '@prisma/client/runtime/library';

export class DocumentDto {
  @ApiProperty({
    type: String,
    description: 'The id of the document',
  })
  documentId: string;
  @ApiProperty({
    type: String,
    description: 'The code of the document',
  })
  code: string;
  @ApiProperty({
    type: String,
    description: 'The path of the document',
  })
  path: string;
  @ApiProperty({
    type: String,
    description: 'The content of the document',
  })
  content: JsonValue;
  @ApiProperty({
    type: Boolean,
    description: 'The state of the document',
  })
  state: boolean;
  @ApiProperty({
    type: String,
    description: 'The typeDocId of the document',
  })
  typeDocId: string;
  @ApiProperty({
    type: String,
    description: 'The type document of the document',
  })
  typeDoc: string;
  @ApiProperty({
    type: String,
    description: 'The user id of the document',
  })
  userId: string;
  @ApiProperty({
    type: String,
    description: 'The user name of the document',
  })
  userName: string;
}
