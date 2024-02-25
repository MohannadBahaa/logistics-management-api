import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { tokenConstants } from 'src/common/constants/token.options';
import { errorMessages } from 'src/common/constants/error.messages';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateTokens(
    payload: any,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // Generate an access token using the payload with "type: 'access'"
    const accessToken = await this.jwtService.signAsync(
      { sub: payload, type: tokenConstants.type.ACCESS },
      { expiresIn: tokenConstants.options.accessToken.expiresIn },
    );

    // Generate a refresh token using the payload with "type: 'refresh'" and a longer expiration time
    const refreshToken = await this.jwtService.signAsync(
      { sub: payload, type: tokenConstants.type.REFRESH },
      { expiresIn: tokenConstants.options.refreshToken.expiresIn },
    );

    return { accessToken, refreshToken };
  }

  async generateAccessToken(refreshToken: string): Promise<string> {
    // Verify the refresh token and extract the payload
    const payload = await this.verifyToken(refreshToken);

    // Check if the token type is "refresh"
    if (payload.type !== tokenConstants.type.REFRESH) {
      throw new UnauthorizedException(errorMessages.invalidTokenType);
    }

    // Generate a new access token using the payload with "type: 'access'"
    const accessToken = await this.jwtService.signAsync(
      { sub: payload?.sub, type: tokenConstants.type.ACCESS },
      { expiresIn: tokenConstants.options.accessToken.expiresIn },
    );

    return accessToken;
  }

  async verifyToken(token: string): Promise<any> {
    // Verify and decode the JWT token
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      // this just to customize the error so the client will hit the refresh token
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException(errorMessages.tokenExpired);
      }

      throw new UnauthorizedException(errorMessages.invalidToken);
    }
  }

  decodeToken(token: string): any {
    // Decode the JWT token without verification
    return this.jwtService.decode(token);
  }
}
