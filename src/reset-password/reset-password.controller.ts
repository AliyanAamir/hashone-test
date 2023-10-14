import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';




@Controller('reset-password')
export class ResetPasswordController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async resetPassword(@Body() body: { resetToken: string; newPassword: string }): Promise<{ message: string }> {
    await this.authService.resetPassword(body.resetToken, body.newPassword);
    return { message: 'Password reset successfully' };
  }
}
