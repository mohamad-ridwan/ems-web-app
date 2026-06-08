import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Req,
  Res,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthService)
    private authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() body: any, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (user.group !== 'Operations') {
      throw new UnauthorizedException(
        'Access denied: Only members of Operations group can login',
      );
    }
    const tokenResponse = await this.authService.login(user);
    
    res.cookie('access_token', tokenResponse.access_token, {
      httpOnly: true,
      secure: false, // Set true in production
      sameSite: 'lax',
      path: '/',
      maxAge: 3600000, // 1 hour
    });
    
    return {
      message: 'Login successful',
      employee: tokenResponse.employee,
    };
  }

  @Get('me')
  async getProfile(
    @Req() req: Request,
    @Query('access_token') tokenParam?: string,
  ) {
    let token = tokenParam || req.cookies?.['access_token'];
    
    if (!token && req.headers.authorization) {
      const parts = req.headers.authorization.split(' ');
      if (parts.length === 2 && parts[0].toLowerCase() === 'bearer') {
        token = parts[1];
      }
    }

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    const profile = await this.authService.getProfileByToken(token);
    if (!profile) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return profile;
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', { path: '/' });
    return { message: 'Logout successful' };
  }
}
