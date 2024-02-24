import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token/token.service';
import { UserModule } from '../user/user.module';
import { ConfigService } from '@nestjs/config'; // Import ConfigModule and ConfigService
import * as fs from 'fs'; // Import the file system module

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('app.jwtSecret'), // Read JWT secret from config module
        privateKey: fs.readFileSync('./my_ed25519_key'),
        publicKey: fs.readFileSync('./my_ed25519_key.pub'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
  exports: [TokenService],
})
export class AuthModule {}
