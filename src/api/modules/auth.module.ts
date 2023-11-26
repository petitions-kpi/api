import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { MailModule } from './mail.module';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../security/strategies/jwt.strategy';
import { LocalStrategy } from '../../security/strategies/local.strategy';

@Module({
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
  imports: [
    MailModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: process.env.ACCESS_TTL,
      },
    }),
  ],
})
export class AuthModule {}
