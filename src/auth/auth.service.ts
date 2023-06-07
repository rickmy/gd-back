import { HttpException, HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { MailService } from 'src/modules/mail/mail.service';
import { resolve } from 'path';
import { PayloadModel } from './models/payloadModel';
import { UserService } from 'src/modules/user/user.service';
import { CredentialsDto } from './dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { ResponseAuth } from './models/responseAuth';

@Injectable()
export class AuthService {
  constructor(
    private _mailService: MailService,
    private _userService: UserService,
    private _jwtService: JwtService,
  ) {}


  async login(credentials: CredentialsDto): Promise<ResponseAuth>{

    const user = await this._userService.findByEmail(credentials.email);
    if(!user) {
      throw new UnprocessableEntityException('Usuario no existe');

    }
    const isMatch = await this._userService.comparePassword(
      credentials.password,
      user.password,
    );
    if(!isMatch){
      throw new Error('Credenciales inválidas');
    }

    const payload: PayloadModel = {
      id:user.id,
      email: user.email,
      role: user.idRol,
    };
    
    return{ accessToken: await this._jwtService.sign(payload)};

  }

  async forgetPassword(email: string): Promise<null> {
    const userExists = await this._userService.findByEmail(email);
    if (!userExists) throw new HttpException('Usuario no existe', HttpStatus.BAD_REQUEST);
    if (!userExists.state)
      throw new HttpException(
        'El usuario se encuentra inactivo/bloqueado',
        HttpStatus.CONFLICT,
      );
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const token = this._jwtService.sign(
      {
        id: userExists.id,
        email: userExists.email,
      },
      { expiresIn: '5m' },
    );
    const fullName = `${userExists.firstName} ${userExists.lastName}`
    const send = await this._mailService.sendForgetPasswordEmail(email, token,fullName);
    if (!send)
      throw new HttpException(
        'Error al enviar el correo',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return;
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
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

  validateUser(payload: PayloadModel) {
    return new Promise((resolve, reject) => {
      resolve(true);
      reject(false);
    });
  }
}
