import { Controller, Post, Body, UnauthorizedException, Inject } from '@nestjs/common';
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
}
