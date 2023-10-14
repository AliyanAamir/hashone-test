import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email/email.service';


@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
  MongooseModule.forRoot(process.env.MONGODB_URI),
  AuthModule,
 
  ],
  controllers: [AppController],
  providers: [AppService,EmailService],
})
export class AppModule {}
