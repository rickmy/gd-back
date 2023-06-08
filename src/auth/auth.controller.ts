import { Controller, Get, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from './dto/change-password.dto';
import { GetUser } from './get-user.decorator';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

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


  @Patch('/change-password')
  @UseGuards(AuthGuard())
  changePassword(
    @Body() ChangePasswordDto: ChangePasswordDto,
    @GetUser() user: User
  ): Promise<void> {
    return this.authService.changePassword(ChangePasswordDto, user);
  }

  @Get()
  findAll() {
    return this.authService.sendEmailTest();
  }

}

