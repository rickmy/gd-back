import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
  BadRequestException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { MailService } from 'src/modules/mail/mail.service';
import { PayloadModel } from './models/payloadModel';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ResponseAuthModel } from './models/responseAuth';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    private _mailService: MailService,
    private _userService: UserService,
    private _jwtService: JwtService,
  ) {}

  async login(credentials: CredentialsDto): Promise<ResponseAuthModel> {
    this.logger.log(`Login attempt for ${credentials.email}`);
    const user = await this._userService.findByEmail(credentials.email);
    if (!user) {
      this.logger.log(`User not found ${credentials.email}`);
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    if (!user.state) throw new UnauthorizedException('Usuario inactivo');
    const isMatch = await this.comparePassword(
      credentials.password,
      user.password,
    );
    if (!isMatch) {
      throw new BadRequestException('Credenciales invalidas');
    }
    const payload: PayloadModel = {
      id: user.userId,
      email: user.email,
      role: user.rolId,
    };
    user.password = undefined;
    this.logger.log(`Login success for ${credentials.email}`);
    return {
      accessToken: await this.createToken(payload),
      user: {
        id: user.userId,
        name: user.name,
        lastName: user.lastName,
        completeName: user.completeName,
        email: user.email,
        state: user.state,
        rolId: user.rolId,
        rol: user.rol.name,
      },
    };
  }

  async register(register: RegisterDto): Promise<HttpException> {
    const { email } = register;
    const existEmail = await this._userService.findByEmail(email);
    if (existEmail)
      throw new UnprocessableEntityException('El usuario ya existe');
    const salt = bcrypt.genSaltSync(10);
    const password = this.hashPassword(register.password, salt);
    try {
      this.logger.log('Creando usuario');
      await this._userService.create({
        ...register,
        password,
        completeName: `${register.name} ${register.lastName}`,
        salt,
      });
      this.logger.log(`Login success for ${register.email}`);
      return new HttpException('Usuario creado', HttpStatus.CREATED);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
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

  async verifyToken(token: string): Promise<PayloadModel> {
    try {
      const payload = await this._jwtService.verifyAsync(token);
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
    const fullName = `${userExist.email}`;
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
    try {
      const payload = await this.verifyToken(resetPasswordDto.token);
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
      const salt = bcrypt.genSaltSync(10);
      const newPassword = bcrypt.hashSync(
        this.hashPassword(resetPasswordDto.newPassword, salt),
        salt,
      );
      const ok = await this._userService.updatePassword(
        userExist.userId,
        newPassword,
        salt,
      );
      if (!ok)
        throw new HttpException(
          'Error al actualizar la contraseña',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      return new HttpException('Contraseña actualizada', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async changePassword(
    changePasswordDto: ChangePasswordDto,
  ): Promise<HttpException> {
    const userExist = await this._userService.findByEmail(
      changePasswordDto.email,
    );
    if (!userExist)
      throw new HttpException('Usuario no existe', HttpStatus.BAD_REQUEST);
    if (!userExist.state)
      throw new HttpException(
        'El usuario se encuentra inactivo/bloqueado',
        HttpStatus.CONFLICT,
      );
    const isMatch = await this.comparePassword(
      changePasswordDto.currentPassword,
      userExist.password,
    );
    if (!isMatch)
      throw new HttpException(
        'La contraseña actual no coincide',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    const salt = bcrypt.genSaltSync(10);
    const newPassword = bcrypt.hashSync(
      this.hashPassword(changePasswordDto.newPassword, salt),
      salt,
    );
    const changed = await this._userService.updatePassword(
      userExist.userId,
      newPassword,
      salt,
    );
    if (!changed)
      throw new HttpException(
        'Error al actualizar la contraseña',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return new HttpException('Contraseña actualizada', HttpStatus.OK);
  }

  async validateToken(payload: PayloadModel): Promise<boolean> {
    const hasUser = await this._userService.validateUser(payload);
    console.log('hasUser', hasUser);
    //if (!hasPermission) throw new UnauthorizedException('🚫 NO AUTORIZADO. 🚫');
    return hasUser;
  }

  async comparePassword(
    password: string,
    storedPasswordHash: string,
  ): Promise<boolean> {
    return bcrypt.compareSync(password, storedPasswordHash);
  }

  hashPassword(password: string, salt: string): string {
    return bcrypt.hashSync(password, salt);
  }
}
