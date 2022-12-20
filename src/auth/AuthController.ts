import {
  Controller,
  Delete,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Delete('/logout')
  async logout(@Request() req, @Res({ passthrough: true }) res: Response) {
    res.cookie('token', '', { expires: new Date() });
    return 'OK';
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.login(req.user);
    res.cookie('token', token, { httpOnly: true });
    return {
      user: req?.user,
      token: token,
    };
  }
}
