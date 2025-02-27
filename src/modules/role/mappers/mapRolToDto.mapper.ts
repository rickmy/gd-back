import { RoleEntity } from '../entities/role.entity';
import { RolDto } from '../dto/rol.dto';

export const mapRolToDto = (rol: RoleEntity): RolDto => {
  return {
    rolId: rol.rolId,
    code: rol.code,
    name: rol.name,
    state: rol.state,
  };
};
