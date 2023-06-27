export class CreateStudentAssignedToCompanyDto {
  idCompany: number | null
  idStudent: number
  idProject: number | null
  electivePeriod: string
  academicPeriod: string
  parallel: string
}