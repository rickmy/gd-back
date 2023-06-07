import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import config from './core/config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config], isGlobal: true }),
    PrismaModule,
    JwtModule.register({
      secret: 'clave',
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    UserModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
