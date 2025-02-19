import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PayloadModel } from '../models/payloadModel';
import { JWT_SECRET } from 'src/core/config';

@Injectable()
export class JWTstrategy extends PassportStrategy(Strategy) {
  constructor(private _authService: AuthService) {
    super({
      secretOrKey: JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
    });
  }
  async validate(payload: PayloadModel) {
    return await this._authService.validateToken(payload);
  }
}
