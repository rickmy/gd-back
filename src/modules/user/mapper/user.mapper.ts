import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';

export const mapUser = (entity: UserEntity, nameRol: string): UserDto => {
  return {
    id: entity.userId,
    name: entity.name,
    lastName: entity.lastName,
    email: entity.email,
    rolId: entity.rolId,
    completeName: entity.completeName,
    state: entity.state,
    rol: nameRol,
  };
};
