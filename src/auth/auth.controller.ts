import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistererDto, RefreshDto, LoginDto } from './dto';

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
    const tokens = await this.authService.signup(registerDto);
    return tokens;
  }

  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  refresh(@Query() refreshDto: RefreshDto) {
    const accessToken = this.authService.refresh(refreshDto);
    return accessToken;
  }
}
