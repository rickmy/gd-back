import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  login(@Body() credentials: CredentialsDto) {
    return this.authService.login(credentials);
  }

  @Post('forget-password')
  forgetPassword(@Body('email') email: string) {
    return this.authService.forgetPassword(email);
  }

  @Get()
  findAll() {
    return this.authService.sendEmailTest();
    return this.authService.sendEmailTest();
  }

  /*
  @Post('reset')
  async requestPasswordReset(@Body() body: { email: string }) {
    const user = await this.authService.findUserByEmail(body.email);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    const resetToken = this.jwtService.sign({ sub: user.id });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'fiedrojas87@gmail.com',
        pass: 'mastercheef123',
      },
    });

    const mailOptions = {
      from: 'a@gmail.com',
      to: user.email,
      subject: 'restablecimiento de contraseña',
      text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: 
      http://tudominio.com/reset-password?token=${resetToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw new Error('Error al enviar el correo electrónico');
      } else {
        console.log('Correo electrónico enviado:', info.response);
      }
    });
  }
  */
}

