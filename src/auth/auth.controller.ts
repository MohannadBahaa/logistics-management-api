import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistererDto, RefreshDto, LoginDto } from './dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() LoginDto: LoginDto) {
    const tokens = await this.authService.login(LoginDto);
    return tokens;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('Signup')
  async signup(@Body() registerDto: RegistererDto) {
    // TODO: send email after signup by sending this message to kafka
    const tokens = await this.authService.signup(registerDto);
    return tokens;
  }

  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  refresh(@Query() refreshDto: RefreshDto) {
    const accessToken = this.authService.refresh(refreshDto);
    return accessToken;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
