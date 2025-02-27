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
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/auth/auth.guard';
import { UserDto } from './dto/user.dto';
import { UpdateUserResponseDto } from './dto/update-user-response-dto';
import { PaginationResult } from 'src/core/models/paginationResult';
import { FilterUserDto } from './dto/filter-user.dto';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('all')
  @ApiOkResponse({
    description: 'Usuarios encontrados',
    type: PaginationResult<UserDto>,
  })
  @ApiOperation({ summary: 'Encontrar todos los usuarios' })
  @UseGuards(JwtAuthGuard)
  findAll(@Body() options: FilterUserDto) {
    return this.userService.findAll(options);
  }

  @Post('active')
  @ApiOkResponse({
    description: 'Usuarios encontrados',
    type: PaginationResult<UserDto>,
  })
  @ApiOperation({ summary: 'Encontrar todos los usuarios activos' })
  @UseGuards(JwtAuthGuard)
  findAllActive(@Body() options: FilterUserDto) {
    return this.userService.findAll(options, true);
  }

  @Get('byRole/:id')
  @ApiOkResponse({
    type: UserDto,
    description: 'Usuarios encontrados',
    isArray: true,
  })
  @ApiOperation({ summary: 'Encontrar todos los usuarios por rol' })
  @UseGuards(JwtAuthGuard)
  findAllByRole(@Param('id') id: string) {
    return this.userService.findAllByRole(id);
  }

  @ApiOkResponse({
    description: 'Usuario encontrado',
    type: UserDto,
  })
  @ApiNoContentResponse({
    description: 'Usuario no encontrado',
    type: null,
  })
  @ApiOperation({ summary: 'Encontrar usuario por su ID' })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOkResponse({
    description: 'Usuario Actualizado',
    type: UpdateUserResponseDto,
  })
  @ApiOperation({ summary: 'Actualizar un usuario por su ID' })
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UpdateUserDto })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Elimina un usuario por su DNI' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiOperation({ summary: 'Eliminar usuario por su ID' })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
