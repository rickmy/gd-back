import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { MailService } from 'src/modules/mail/mail.service';
import { PayloadModel } from './models/payloadModel';
import { UserService } from 'src/modules/user/user.service';
import { CredentialsDto } from './dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { ResponseAuth } from './models/responseAuth';
import { ResetPasswordDto } from './dto/reset-password.dto';
@Injectable()
export class AuthService {
  constructor(
    private _mailService: MailService,
    private _userService: UserService,
    private _jwtService: JwtService,
  ) {}

  async login(credentials: CredentialsDto): Promise<ResponseAuth> {
    const user = await this._userService.findByEmail(credentials.email);
    if (!user) {
      throw new UnprocessableEntityException('Usuario no existe');
    }
    const isMatch = await this._userService.comparePassword(
      credentials.password,
      user.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Credenciales invalidas');
    }
    const payload: PayloadModel = {
      id: user.id,
      email: user.email,
      role: user.idRol,
    };

    return { accessToken: await this._jwtService.sign(payload) };
  }

  async forgetPassword(email: string): Promise<HttpException> {
    const userExist = await this._userService.findByEmail(email);
    if (!userExist)
      throw new HttpException('Usuario no existe', HttpStatus.BAD_REQUEST);
    if (!userExist.state)
      throw new HttpException(
        'El usuario se encuentra inactivo/bloqueado',
        HttpStatus.CONFLICT,
      );
    const token = this._jwtService.sign(
      {
        id: userExist.id,
        email: userExist.email,
      },
      { expiresIn: '5m' },
    );
    const fullName = `${userExist.firstName} ${userExist.lastName}`;
    const send = await this._mailService.sendForgetPasswordEmail(
      email,
      token,
      fullName,
    );
    if (!send)
      throw new HttpException(
        'Error al enviar el correo',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return new HttpException('Correo enviado exitosamente', HttpStatus.OK);
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<HttpException> {
    const payload = this._jwtService.verify(resetPasswordDto.token);
    if (!payload)
      throw new HttpException(
        'El token no es valido',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    const userExist = await this._userService.findByEmail(payload.email);
    if (!userExist)
      throw new HttpException('Usuario no existe', HttpStatus.BAD_REQUEST);
    if (!userExist.state)
      throw new HttpException(
        'El usuario se encuentra inactivo/bloqueado',
        HttpStatus.CONFLICT,
      );
    userExist.password = this._userService.hashPassword(
      resetPasswordDto.newPassword,
    );
    const ok = await this._userService.update(userExist.id, userExist);
    if (!ok)
      throw new HttpException(
        'Error al actualizar la contraseña',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return new HttpException('Contraseña actualizada', HttpStatus.OK);
  }

  create(createAuthDto: CreateAuthDto) {
    return '';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  sendEmailTest(): Promise<boolean> {
    return this._mailService.sendTestEmail('fiedrojas87@gmail.com');
  }

  validateUser(payload: PayloadModel): Promise<boolean> {
    return this._userService.validateUser(payload);
  }
}
