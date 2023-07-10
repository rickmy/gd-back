import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AgreementService } from './agreement.service';
import { CreateAgreementDto } from './dto/create-agreement.dto';
import { UpdateAgreementDto } from './dto/update-agreement.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AgreementEntity } from './entities/agreement.entity';

@Controller('agreement')
@ApiTags('agreement')
export class AgreementController {
  constructor(private readonly agreementService: AgreementService) {}
  @ApiCreatedResponse({ description: 'Estudiante creado', type: CreateAgreementDto })
  @ApiOperation({ summary: 'Crear empresa' })
  @Post()
  create(@Body() createAgreementDto: CreateAgreementDto) {
    return this.agreementService.create(createAgreementDto);
  }

  @ApiOperation({ summary: 'Listar carreras con convenios' })
  @Get('listCareersWithAgreements')
  async listCareersWithAgreements(): Promise<any> {
    const data = await this.agreementService.listCareersWithAgreements();
    return data;
  }

  @ApiOkResponse({
    description: 'Convenios encontrados',
    type: AgreementEntity,
    isArray: true,
  })
  @ApiOperation({ summary: 'Encontrar todos los convenios' })
  @Get()
  findAll() {
    return this.agreementService.findAll();
  }

  @ApiOkResponse({ description: 'Convenio encontrado', type: AgreementEntity })
  @ApiOperation({ summary: 'Encontrar un convenio por su ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agreementService.findOne(+id);
  }


  @ApiOkResponse({
    description: 'Convenio Actualizado',
    type: CreateAgreementDto,
  })
  @ApiOperation({ summary: 'Actualizar un convenio por su ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgreementDto: UpdateAgreementDto) {
    return this.agreementService.update(+id, updateAgreementDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Elimina un convenio por su ID' })
  @ApiResponse({ status: 404, description: 'Convenio no encontrado' })
  @ApiOperation({ summary: 'Eliminar convenio por su ID' })
  remove(@Param('id') id: string) {
    return this.agreementService.remove(+id);
  }
}
