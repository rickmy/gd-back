import { Controller, Get, Post, Body, Patch, UseGuards, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from './dto/change-password.dto';


@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Usuario autenticado correctamente' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  login(@Body() credentials: CredentialsDto) {
    return this.authService.login(credentials);
  }

  @Post('forget-password')
  @ApiOperation({ summary: 'Olvidar contraseña' })
  @ApiBody({ type: String, description: 'Correo electrónico del usuario' })
  @ApiResponse({ status: 200, description: 'Solicitud de restablecimiento de contraseña enviada correctamente' })
  forgetPassword(@Body('email') email: string) {
    return this.authService.forgetPassword(email);
  }


  @Patch('change-password')
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<HttpException> {
    return this.authService.changePassword(changePasswordDto);
  }

  @Get()
  findAll() {
    return this.authService.sendEmailTest();
  }

}

