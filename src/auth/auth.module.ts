import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailModule } from 'src/modules/mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/core/config';
import { PassportModule } from '@nestjs/passport';
import { JWTstrategy } from './strategy/jwt.strategy';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JWTstrategy],
  exports: [PassportModule, JWTstrategy],
  imports: [
    PrismaModule,
    UserModule,
    MailModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: config().jwtSecret,
        signOptions: { expiresIn: '60s' },
      }),
    }),
  ],
})
export class AuthModule {}
