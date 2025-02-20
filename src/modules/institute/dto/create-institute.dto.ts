import { ApiProperty } from '@nestjs/swagger';

export class CreateInstituteDto {
  @ApiProperty({ example: '1', description: 'The code of the institute' })
  code: string;
  @ApiProperty({ example: '1', description: 'The code auth of the institute' })
  codeAuth: string;
  @ApiProperty({ example: '1', description: 'The name of the institute' })
  name: string;
}
