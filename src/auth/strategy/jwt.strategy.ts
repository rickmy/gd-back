import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';
import config from 'src/core/config';
import { PayloadModel } from '../models/payloadModel';

@Injectable()
export class JWTstrategy extends PassportStrategy(Strategy) {
  constructor(private _authService: AuthService) {
    super({
      secretOrKey: config().jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }
  async validate(payload: PayloadModel) {
    return await this._authService.validateUser(payload);
  }
  handleRequest(err: any, user: any, info: Error): any {
    if (err || !user) {
      //this.loggerService.error('Error en la estrategia de autenticación', err?.stack || info?.stack);
      throw err || new UnauthorizedException('No autorizado');
    }
    return user;
  }
}
