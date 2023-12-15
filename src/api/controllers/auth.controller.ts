import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthDto } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../../security/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../../security/guards/local-auth.guard';

@Controller({
  version: '1',
  path: '/auth',
})
export class AuthController {
  constructor (
    private authService: AuthService,
  ) {}

  @Post('/register')
  async register (
    @Body() body: AuthDto,
  ) {
    return this.authService.register(body);
  }

  @Post('/verify/:token')
  async verify (
    @Param('token') token: string,
  ) {
    return this.authService.verify(token);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/refresh')
  async refresh (
    @Req() req,
  ) {
    return this.authService.getTokens(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login (
    @Req() req,
  ) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getUser (
    @Req() req,
  ) {
    return this.authService.getUser(req.user);
  }
}
