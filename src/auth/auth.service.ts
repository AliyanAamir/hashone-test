import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}
  async signUp(signUpto: SignUpDto): Promise<{ message:string }> {
    const { name, email, password } = signUpto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      activated: false,
    });
    const token = this.jwtService.sign({ id: user._id });
    const activationLink = `http://localhost:3000/activate-account?token=${token}`;
    await this.emailService.sendVerificationEmail(email, activationLink);

    return { message:'Account has been created' };
  }


  async activateAccount(activationToken: string): Promise<void> {
    const payload = this.jwtService.verify(activationToken);

    await this.userModel.findByIdAndUpdate(payload.id, { activated: true });
  }
  async forgotPassword(email: string): Promise<void> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const resetToken = this.jwtService.sign({ id: user._id }, { expiresIn: '1h' }); 

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    await this.emailService.sendResetPasswordEmail(email, resetLink);
  }

  async resetPassword(resetToken: string, newPassword: string): Promise<void> {
    const payload = this.jwtService.verify(resetToken);

   

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.userModel.findByIdAndUpdate(payload.id, { password: hashedPassword });
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (user.activated === false) {
      throw new UnauthorizedException(
        'Account is not Activated, activate it first.',
      );
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }
}
