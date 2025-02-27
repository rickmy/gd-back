import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class FilterModalityDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  state?: boolean;
}
