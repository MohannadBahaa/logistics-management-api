import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { tokenConstants } from '../../common/constants/token.options';
import { errorMessages } from '../../common/constants/error.messages';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateTokens(payload: any): { accessToken: string; refreshToken: string } {
    // Generate an access token using the payload with "type: 'access'"
    const accessToken = this.jwtService.sign(
      { sub: payload, type: tokenConstants.type.ACCESS },
      { expiresIn: tokenConstants.options.accessToken.expiresIn },
    );

    // Generate a refresh token using the payload with "type: 'refresh'" and a longer expiration time
    const refreshToken = this.jwtService.sign(
      { sub: payload, type: tokenConstants.type.REFRESH },
      { expiresIn: tokenConstants.options.refreshToken.expiresIn },
    );

    return { accessToken, refreshToken };
  }

  generateAccessToken(refreshToken: string): string {
    // Verify the refresh token and extract the payload
    const payload = this.verifyToken(refreshToken);

    // Check if the token type is "refresh"
    if (payload.type !== tokenConstants.type.REFRESH) {
      throw new UnauthorizedException(errorMessages.invalidTokenType);
    }

    // Generate a new access token using the payload with "type: 'access'"
    const accessToken = this.jwtService.sign(
      { sub: payload?.sub, type: tokenConstants.type.ACCESS },
      { expiresIn: tokenConstants.options.accessToken.expiresIn },
    );

    return accessToken;
  }

  verifyToken(token: string): any {
    // Verify and decode the JWT token
    try {
      return this.jwtService.verify(token);
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
