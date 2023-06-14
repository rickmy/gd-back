import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MailService } from 'src/modules/mail/mail.service';
import { PayloadModel } from './models/payloadModel';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ResponseAuthModel } from './models/responseAuth';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
@Injectable()
export class AuthService {
  constructor(
    private _mailService: MailService,
    private _userService: UserService,
    private _jwtService: JwtService,
  ) {}

  async login(credentials: CredentialsDto): Promise<ResponseAuthModel> {
    const user = await this._userService.findByEmail(credentials.email);
    if (!user) throw new UnprocessableEntityException('Usuario no existe');
    if (!user.state) throw new UnauthorizedException('Usuario inactivo');
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
    user.password = undefined;

    return { accessToken: await this.createToken(payload), user };
  }

  async createToken(payload: PayloadModel): Promise<string> {
    try {
      const token = await this._jwtService.signAsync(payload);
      return token;
    } catch (error) {
      //this.loggerService.error('Error al crear el token JWT', error.stack);
      throw new UnauthorizedException(`Error en el token JWT ${error}`);
    }
  }

  verifyToken(token: string): any {
    try {
      const payload = this._jwtService.verify(token);
      return payload;
    } catch (error) {
      //this.loggerService.error('Error en el token JWT', error.stack);
      throw new UnauthorizedException(`Error en el token JWT ${error}`);
    }
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
    const token = await this._jwtService.signAsync(
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
    const payload = await this.verifyToken(resetPasswordDto.token);
    if (!payload)
      throw new HttpException(
        'El token no es valido',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    const userExist = await this._userService.findOne(payload.id);
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

  async changePassword(
    changePasswordDto: ChangePasswordDto,
  ): Promise<HttpException> {
    const userExist = await this._userService.findOne(changePasswordDto.userId);
    if (!userExist)
      throw new HttpException('Usuario no existe', HttpStatus.BAD_REQUEST);
    if (!userExist.state)
      throw new HttpException(
        'El usuario se encuentra inactivo/bloqueado',
        HttpStatus.CONFLICT,
      );
    const isMatch = await this._userService.comparePassword(
      changePasswordDto.currentPassword,
      userExist.password,
    );
    if (!isMatch)
      throw new HttpException(
        'La contraseña actual no coincide',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    userExist.password = this._userService.hashPassword(
      changePasswordDto.newPassword,
    );
    const changed = await this._userService.update(userExist.id, userExist);
    if (!changed)
      throw new HttpException(
        'Error al actualizar la contraseña',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return new HttpException('Contraseña actualizada', HttpStatus.OK);
  }

  validateUser(payload: PayloadModel): Promise<boolean> {
    return this._userService.validateUser(payload);
  }
}
