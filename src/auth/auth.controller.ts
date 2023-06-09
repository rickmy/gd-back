import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CredentialsDto } from './dto/credentials.dto';
import { RequestResetPasswordDto } from './dto/request-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({
    status: 200,
    description: 'Usuario autenticado correctamente',
  })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  login(@Body() credentials: CredentialsDto) {
    return this.authService.login(credentials);
  }

  @Post('forget-password')
  @ApiOperation({ summary: 'Olvidar contraseña' })
  @ApiBody({ type: String, description: 'Correo electrónico del usuario' })
  @ApiResponse({
    status: 200,
    description:
      'Solicitud de restablecimiento de contraseña enviada correctamente',
  })
  @Post('reset-password')
  @ApiOperation({ summary: 'Restablecer contraseña' })
  @ApiBody({
    type: RequestResetPasswordDto,
    description: 'Token y nueva contraseña del usuario',
  })
  forgetPassword(@Body('email') email: string) {
    return this.authService.forgetPassword(email);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Restablecer contraseña' })
  @ApiBody({
    type: ResetPasswordDto,
    description: 'Token y nueva contraseña del usuario',
  })
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Get()
  findAll() {
    return this.authService.sendEmailTest();
  }
}
