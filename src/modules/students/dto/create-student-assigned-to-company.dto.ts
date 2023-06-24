export class CreateStudentAssignedToCompanyDto {
  idCompany: number | null
  idStudent: string
  idProject: number | null
  electivePeriod: string
  academicPeriod: string
  parallel: string
}