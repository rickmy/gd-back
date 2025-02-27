import { IsString, IsBoolean } from 'class-validator';

export class RolDto {
  @IsString({
    message: 'el id del rol debe ser un string',
  })
  rolId: string;
  @IsString({
    message: 'el codigo del rol debe ser un string',
  })
  code: string;
  @IsString({
    message: 'el nombre del rol debe ser un string',
  })
  name: string;
  @IsBoolean({
    message: 'el estado del rol debe ser un boolean',
  })
  state: boolean;
}
