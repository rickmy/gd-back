import { ApiProperty } from '@nestjs/swagger';
import { Institute } from '@prisma/client';

export class InstituteEntity implements Institute {
  @ApiProperty({ example: 1, description: 'The id of the institute' })
  id: number;
  @ApiProperty({ example: '1', description: 'The id of the institute' })
  instituteId: string;
  @ApiProperty({ example: '1', description: 'The code of the institute' })
  code: string;
  @ApiProperty({ example: '1', description: 'The code auth of the institute' })
  codeAuth: string;
  @ApiProperty({ example: '1', description: 'The name of the institute' })
  name: string;
  @ApiProperty({ example: '02/02/2025', description: 'createdAt date' })
  createdAt: Date;
  @ApiProperty({ example: '02/02/2025', description: 'updatedAt date' })
  updatedAt: Date;
  @ApiProperty({ example: true, description: 'The state of the institute' })
  state: boolean;
}
