// forgot-password.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Controller('forgot-password')
export class ForgotPasswordController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async forgotPassword(@Body() body: { email: string }): Promise<{ message: string }> {
    await this.authService.forgotPassword(body.email);
    return { message: 'Password reset instructions sent to your email' };
  }
}
