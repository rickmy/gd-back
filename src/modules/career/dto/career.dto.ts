import { UserByCareerDto } from "./user-by-career.dto";

  export class CareerDto {
    id: number;
    code: string;
    name: string;
    dateStart: Date;
    dateEnd: Date;
    timeRenovationAgreement: number;
    coordinator: UserByCareerDto;
    viceCoordinator: UserByCareerDto;
    respStepDual: UserByCareerDto;
  }