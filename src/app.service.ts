import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  healthcheck(): string {
    console.log(this.configService.get<number>('database'));
    console.log(this.configService.get<number>('app'));
    return 'Working 🚀';
  }
}
