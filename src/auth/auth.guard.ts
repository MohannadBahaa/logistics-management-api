import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from './token/token.service';
import { errorMessages } from 'src/constants/error.messages';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(errorMessages.invalidToken);
    }
    try {
      const payload = await this.tokenService.verifyToken(token);
      request['user'] = payload?.sub;
    } catch {
      throw new UnauthorizedException(errorMessages.invalidToken);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
