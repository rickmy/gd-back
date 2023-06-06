import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ChangePasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }


  @Patch('/change-password')
  @UseGuards(AuthGuard())
  changePassword(
  @Body() ChangePasswordDto: ChangePasswordDto,
  @GetUser() user: User
 ): Promise<void> {
  const a = 1;
  return;

 } 
}
function GetUser(): (target: AuthController, propertyKey: "changePassword", parameterIndex: 1) => void {
  throw new Error('Function not implemented.');
}

function AuthGuard(): Function | import("@nestjs/common").CanActivate {
  throw new Error('Function not implemented.');
}

