import { Controller, Post, Body, Get, Query, Req, UnauthorizedException, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthService)
    private authService: AuthService
  ) {}

  @Post('login')
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (user.group !== 'Operations') {
      throw new UnauthorizedException('Access denied: Only members of Operations group can login');
    }
    return this.authService.login(user);
  }

  @Get('me')
  async getProfile(@Req() req: any, @Query('access_token') tokenParam?: string) {
    let token = tokenParam;
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
}
