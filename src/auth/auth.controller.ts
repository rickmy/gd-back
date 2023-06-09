import { Controller, Get, Post, Body, Patch, UseGuards, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from './dto/change-password.dto';


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

