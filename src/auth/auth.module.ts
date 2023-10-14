import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from 'src/email/email.service';
import { ActivationController } from 'src/activation/activation.controller';
import { ResetPasswordController } from 'src/reset-password/reset-password.controller';
import { ForgotPasswordController } from 'src/reset-password/forgot-password.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { 
            expiresIn: config.get<string | number>('JWT_EXPIRE') 
          },
        };
      },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController,ActivationController,ResetPasswordController,ForgotPasswordController],
  providers: [AuthService,EmailService],
})
export class AuthModule {}
