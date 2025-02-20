import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { InstituteService } from '../servicies/institute.service';
import { CreateInstituteDto } from '../dto/create-institute.dto';
import { UpdateInstituteDto } from '../dto/update-institute.dto';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/auth/auth.guard';
import { PaginationResult } from 'src/core/models/paginationResult';
import { InstituteDto } from '../dto/institute.dto';
import { FilterInstituteDto } from '../dto/filter.institute.dto';

@ApiTags('institute')
@ApiBearerAuth()
@Controller('institute')
export class InstituteController {
  constructor(private readonly instituteService: InstituteService) {}

  @ApiOkResponse({
    description: 'Institute created successfully',
    type: CreateInstituteDto,
  })
  @ApiOperation({ summary: 'Create Institute' })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createInstituteDto: CreateInstituteDto) {
    return this.instituteService.create(createInstituteDto);
  }

  @Post('all')
  @ApiOkResponse({
    description: 'Institutes found',
    type: PaginationResult<InstituteDto>,
  })
  @ApiOperation({ summary: 'Find all Institutes' })
  @UseGuards(JwtAuthGuard)
  findAll(@Body() options: FilterInstituteDto) {
    return this.instituteService.findAll(options);
  }

  @ApiOkResponse({
    description: 'Institute found successfully',
    type: InstituteDto,
  })
  @ApiNoContentResponse({
    description: 'Institute not found',
    type: null,
  })
  @ApiOperation({ summary: 'Find Institute by id' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instituteService.findOne(id);
  }

  @ApiOkResponse({
    description: 'Institute updated successfully',
    type: UpdateInstituteDto,
  })
  @ApiOperation({ summary: 'Update Institute by id' })
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateInstituteDto: UpdateInstituteDto,
  ) {
    return this.instituteService.update(id, updateInstituteDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Institute deleted successfully' })
  @ApiOperation({ summary: 'Delete Institute by id' })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.instituteService.remove(id);
  }
}
