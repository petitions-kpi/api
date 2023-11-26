import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from '../dto/auth.dto';
import { UserRepo } from '../../database/repos/user.repo';
import { UserAlreadyExistsException } from '../../utils/exceptions/user-already-exists.exception';
import * as bcrypt from 'bcrypt';
import { MailService } from './mail.service';
import * as process from 'process';
import { EntityNotFoundException } from '../../utils/exceptions/entity-not-found.exception';
import { State, User } from '@prisma/client';
import { TokenHasExpiredException } from '../../utils/exceptions/token-has-expired.exception';
import { JwtService } from '@nestjs/jwt';
import { HOUR } from '../../utils/constants';

@Injectable()
export class AuthService {
  constructor (
    private userRepo: UserRepo,
    private mailService: MailService,
    private jwtService: JwtService,
  ) {}

  async userExists (email: string): Promise<boolean> {
    const user = await this.userRepo.find({ email });
    return !!user;
  }

  async register (user: AuthDto): Promise<void> {
    if (await this.userExists(user.email)) {
      throw new UserAlreadyExistsException();
    }

    const hash = await this.hashPassword(user.password);

    const { mailToken } = await this.userRepo.create({
      ...user,
      password: hash,
      mailToken: {
        create: {},
      },
    });

    await this.mailService.send({
      to: user.email,
      subject: 'Верифікація пошти',
      message: 'Перейдіть за посиланням, щоб підтвердити свою пошту на kpetitions.com',
      link: `${process.env.FRONT_BASE_URL}/verify/${mailToken.value}`,
    });
  }

  async login (user: User) {
    if (user.state !== State.APPROVED) {
      throw new UnauthorizedException('Email not yet verified');
    }
    return this.getTokens(user);
  }

  async verify (token: string): Promise<{ accessToken: string, refreshToken: string }> {
    const user = await this.userRepo.find({
      mailToken: { value: token },
    });

    if (!user) {
      throw new EntityNotFoundException('User');
    }

    if (Date.now() - user.mailToken.createdAt.getTime() > HOUR) {
      throw new TokenHasExpiredException();
    }

    await this.userRepo.updateById(user.id, {
      state: State.APPROVED,
      mailToken: {
        delete: {},
      },
    });

    return this.getTokens(user);
  }

  getTokens (user: User): { accessToken: string, refreshToken: string } {
    const payload = {
      sub: user.id,
      email: user.email,
      createdAt: Date.now(),
    };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: process.env.REFRESH_TTL,
      }),
    };
  }

  async hashPassword (password: string): Promise<string> {
    const salt = 7;
    return bcrypt.hash(password, salt);
  }
}
