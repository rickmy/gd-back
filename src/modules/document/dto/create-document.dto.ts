import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class CreateDocumentDto {
  @ApiProperty({
    type: String,
    description: 'The code of the document',
  })
  @IsString({
    message: 'the code must be a string',
  })
  code: string;
  @ApiProperty({
    type: String,
    description: 'The path of the document',
  })
  @IsString({
    message: 'the path must be a string',
  })
  path: string;
  @ApiProperty({
    type: Date,
    description: 'The content of the document',
  })
  @IsString({
    message: 'the content must be a string',
  })
  content: string;
  @ApiProperty({
    type: Boolean,
    description: 'The state of the document',
  })
  @IsBoolean({
    message: 'the state must be a boolean',
  })
  state: boolean;
  @ApiProperty({
    type: String,
    description: 'The typeDocId of the document',
  })
  @IsUUID('4', {
    message: 'the typeDocId must be a uuid',
  })
  typeDocId: string;
  @ApiProperty({
    type: String,
    description: 'The templateId of the document',
  })
  @IsUUID('4', {
    message: 'the templateId must be a uuid',
  })
  templateId: string;
  @ApiProperty({
    type: String,
    description: 'The user id of the document',
  })
  @IsUUID('4', {
    message: 'the userId must be a uuid',
  })
  userId: string;
}
