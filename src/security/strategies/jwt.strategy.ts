import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as process from 'process';
import { JwtPayloadDto } from '../../api/dto/jwt-payload.dto';
import { PrismaService } from '../../database/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }

  async validate (payload: JwtPayloadDto): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: payload.sub,
      },
    });

    if (!user) throw new UnauthorizedException();

    delete user.password;

    return user;
  }
}