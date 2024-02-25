import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomConfigModule } from './config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ShipmentModule } from './shipment/shipment.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    CustomConfigModule,
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.url'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    ShipmentModule,
    KafkaModule.register({
      clientId: 'logistics-management-client',
      brokers: ['localhost:9092'],
      groupId: 'logistics-management-group',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
