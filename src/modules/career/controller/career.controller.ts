import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Get,
} from '@nestjs/common';
import { CareerService } from '../service/career.service';
import { CreateCareerDto } from '../dto/create-career.dto';
import { UpdateCareerDto } from '../dto/update-career.dto';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@auth/guards/auth/auth.guard';
import { CareerDto } from '../dto/career.dto';
import { PaginationResult } from '@core/models/paginationResult';
import { FilterCareerDto } from '../dto/filter-career.dto';

@ApiTags('career')
@ApiBearerAuth()
@Controller('career')
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @ApiOkResponse({
    description: 'Career created successfully',
    type: CreateCareerDto,
  })
  @ApiOperation({ summary: 'Create Career' })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCareerDto: CreateCareerDto) {
    return this.careerService.create(createCareerDto);
  }

  @ApiOkResponse({
    description: 'Careers found',
    type: PaginationResult<CareerDto>,
  })
  @ApiOperation({ summary: 'Find all Careers' })
  @UseGuards(JwtAuthGuard)
  @Post('all')
  findAll(@Body() options: FilterCareerDto) {
    return this.careerService.findAll(options);
  }

  @ApiOkResponse({
    description: 'Career found successfully',
    type: CareerDto,
  })
  @ApiNoContentResponse({
    description: 'Career not found',
    type: null,
  })
  @ApiOperation({ summary: 'Find Career by id' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.careerService.findOne(id);
  }

  @ApiOkResponse({
    description: 'Career updated successfully',
    type: UpdateCareerDto,
  })
  @ApiOperation({ summary: 'Update Career by id' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCareerDto: UpdateCareerDto) {
    return this.careerService.update(id, updateCareerDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Career deleted successfully' })
  @ApiOperation({ summary: 'Delete Career by id' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.careerService.remove(id);
  }
}
