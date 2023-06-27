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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/auth/auth.guard';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ description: 'Usuario Creado', type: CreateUserDto })
  @ApiOperation({ summary: 'Crear usuario' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Usuarios encontrados',
    isArray: true,
    type: UserEntity,
  })
  @ApiNoContentResponse({
    description: 'Usuarios no encontrados',
    isArray: true,
    type: null,
  })
  @ApiOperation({ summary: 'Encontrar todos los usuarios' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get('active')
  @ApiOkResponse({
    description: 'Usuarios encontrados',
    isArray: true,
    type: UserEntity,
  })
  @ApiNoContentResponse({
    description: 'Usuarios no econtrados',
    isArray: true,
    type: null,
  })
  @ApiOperation({ summary: 'Encontrar todos los usuarios activos' })
  @UseGuards(JwtAuthGuard)
  findAllActive() {
    return this.userService.findAll(true);
  }

  @ApiOkResponse({
    description: 'Usuario encontrado',
    type: UserEntity,
  })
  @ApiNoContentResponse({
    description: 'Usuario no encontrado',
    type: null,
  })
  @ApiOperation({ summary: 'Encontrar usuario por su DNI' })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOkResponse({
    description: 'Usuario Actualizado',
    type: CreateUserDto,
  })
  @ApiOperation({ summary: 'Actualizar un usuario por su DNI' })
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Elimina un usuario por su DNI' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiOperation({ summary: 'Eliminar usuario por su ID' })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
