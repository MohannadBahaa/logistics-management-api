import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor() {}
  healthcheck(): string {
    return 'Working 🚀';
  }
}
