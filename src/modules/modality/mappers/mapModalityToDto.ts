import { ModalityDto } from '../dto/modality.dto';
import { ModalityEntity } from '../entities/modality.entity';

export const mapModalityToDto = (modality: ModalityEntity): ModalityDto => {
  return {
    modalityId: modality.modalityId,
    name: modality.name,
    state: modality.state,
  };
};
