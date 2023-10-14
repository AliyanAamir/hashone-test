import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter;

  constructor(
    private readonly configService: ConfigService
  ) {
    this.transporter = nodemailer.createTransport({

      service: 'gmail',
      auth: {
        
        user: this.configService.get<string>('ROOT_USER'),
        pass: this.configService.get<string>('ROOT_PASS'),
      },
    });
  }

  async sendVerificationEmail(to: string, activationLink: string): Promise<void> {
    const mailOptions = {
      from: this.configService.get<string>('ROOT_USER'),
      to,
      subject: 'Account Activation',
      html: `<p>Click <a href="${activationLink}">here</a> to activate your account.</p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
  async sendResetPasswordEmail(to: string, resetLink: string): Promise<void> {
    const mailOptions = {
      from: this.configService.get<string>('ROOT_USER'),
      to,
      subject: 'Password Reset',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. The link will expire in 1 hour</p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}