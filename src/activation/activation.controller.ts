// activation.controller.ts

import { Controller, Get, Param ,Query} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';




@Controller('activate-account')
export class ActivationController {
  constructor(private readonly authService: AuthService) {}

  @Get()

  async activateAccount(@Query('token') token: string): Promise<string> {
    try {
      await this.authService.activateAccount(token);
      return 'Email activated successfully';
    } catch (error) {
      return 'Error activating email. Please try again or contact support.';
    }
  }
}
