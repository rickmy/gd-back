import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PayloadModel } from '../models/payloadModel';
import { Request } from 'express';
import { JWT_SECRET } from 'src/core/config';

@Injectable()
export class JWTstrategy extends PassportStrategy(Strategy) {
  private logger = new Logger('JWTstrategy');
  route: string;
  constructor(private _authService: AuthService) {
    super({
      secretOrKey: JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          this.route = `${req.method} ${req.route.path}`;
          return req?.cookies?.Authentication;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
    });
  }
  async validate(payload: PayloadModel) {
    this.logger.log(this.route);
    return await this._authService.validateToken(payload, this.route);
  }
}
