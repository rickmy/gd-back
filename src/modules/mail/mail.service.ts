import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly _mailerService: MailerService) {}

  async sendTestEmail(email: string): Promise<boolean> {
    try {
      const res = await this._mailerService.sendMail({
        to: email,
        subject: 'Prueba de correo',
        template: './forget-password',
        context: {
          url: 'https://www.google.com',
          siteName: 'Yavirac',
          email,
        },
      });
      console.log(res);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async sendForgetPasswordEmail(
    email: string,
    token: string,
    fullName: string,
  ): Promise<boolean> {
    try {
      const res = await this._mailerService.sendMail({
        to: email,
        subject: 'Recuperar contraseña',
        template: './forget-password',
        context: {
          url: `http://localhost:4200/auth/reset-password?token=${token}`,
          siteName: 'Yavirac',
          fullName,
        },
      });
      console.log(res);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async sendMailAgreementRenovation(
    coordinatorEmail: string,
    viceCoordinatorEmail: string,
    responsibleEmail: string,
    codes: string[],
  ): Promise<boolean> {
    try {
      const res = await this._mailerService.sendMail({
        to: [coordinatorEmail, viceCoordinatorEmail, responsibleEmail],
        subject: 'Alerta de convenios por vencer',
        template: './alert-agreements-to-expire',
        context: {
          siteName: 'Yavirac',
          
          codes,
        },
      });
      console.log(res);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
