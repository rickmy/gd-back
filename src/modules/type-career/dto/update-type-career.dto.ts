import { PartialType } from '@nestjs/swagger';
import { CreateTypeCareerDto } from './create-type-career.dto';

export class UpdateTypeCareerDto extends PartialType(CreateTypeCareerDto) {}
