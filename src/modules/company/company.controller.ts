import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompanyEntity } from './entities/company.entity';
import { CompaniesInfoDto } from './dto/companies-info.dto';

@Controller('company')
@ApiTags('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiCreatedResponse({ description: 'Estudiante creado', type: CreateCompanyDto })
  @ApiOperation({ summary: 'Crear empresa' })
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @ApiOkResponse({
    description: 'Estudiantes encontrados',
    type: CompanyEntity,
    isArray: true,
  })
  @ApiOperation({ summary: 'Encontrar todas las empresas' })
  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @ApiOkResponse({ description: 'Estudiante encontrado', type: CompanyEntity })
  @ApiOperation({ summary: 'Encontrar una empresa por su ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @ApiOkResponse({
    description: 'Obtener información de una empresa',
    type: CompaniesInfoDto,
  })
  @ApiOperation({ summary: 'Obtener información de una empresa' })
  @Get(':id')
  getCompanyInfo(@Param('id') id: string) {
    return this.companyService.findOneCompanyInfo(id);
  }

  @Get('active')
  @ApiOkResponse({
    description: 'Empresas encontradas',
    type: CompanyEntity,
    isArray: true,
  })
  @ApiOperation({ summary: 'Encontrar todas las empresas activas' })
  findAllActive(state: boolean) {
    return this.companyService.findAll(state);
  }

  @ApiOkResponse({
    description: 'Empresa Actualizada',
    type: CreateCompanyDto,
  })
  @ApiOperation({ summary: 'Actualizar una empresa por su ID' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }
  @ApiOkResponse({
    description: 'Status de la empresa actualizado',
    type: CreateCompanyDto,
  })
  @ApiOperation({ summary: 'Actualizar el status de una empresa por su ID' })
  @Put('status/:id')
  updateStatusCompany(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.updateStatusCompany(
      +id,
      updateCompanyDto.status,
    );
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Elimina una empresa por su ID' })
  @ApiResponse({ status: 404, description: 'Empresa no encontrada' })
  @ApiOperation({ summary: 'Eliminar empresa por su ID' })
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
