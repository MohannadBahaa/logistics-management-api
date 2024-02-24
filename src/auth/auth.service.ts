import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegistererDto, RefreshDto } from './dto';
import { UserService } from '../user/user.service';
import { TokenService } from './token/token.service';
import { errorMessages } from '../common/constants/error.messages';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findUserByEmail(loginDto?.email);
    if (!user) {
      throw new UnauthorizedException(errorMessages.invalidCredentials);
    }

    // Check if password matches
    const passwordMatches = await this.userService.comparePasswords(
      loginDto.password,
      user.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException(errorMessages.invalidCredentials);
    }

    const { password, ...cleanUserPayload } = user.toObject();
    // If password matches, generate and return access token
    const tokens = await this.tokenService.generateTokens(cleanUserPayload);

    return { tokens };
  }

  async signup(registerDto: RegistererDto) {
    // Check if the user already exists
    const existingUser = await this.userService.findUserByEmail(
      registerDto.email,
    );

    if (existingUser) {
      throw new UnauthorizedException(errorMessages.userAlreadyExists);
    }

    // Create a new user based on the provided DTO
    const newUser = await this.userService.create(registerDto);

    const { password, ...cleanUserPayload } = newUser.toObject();
    // Generate an access token for the new user
    const tokens = await this.tokenService.generateTokens(cleanUserPayload);

    return { tokens };
  }

  async refresh(refreshDto: RefreshDto) {
    const refreshToken = refreshDto.refresh_token;
    const accessToken = await this.tokenService.generateAccessToken(
      refreshToken,
    );
    return { accessToken };
  }
}
