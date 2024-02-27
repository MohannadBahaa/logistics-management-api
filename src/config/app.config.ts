import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  kafkaBrokers: process.env.KAFKA_BROKERS,
  kafkaClientId: process.env.KAFKA_CLIENT_ID,
  kafkaGroupId: process.env.KAFKA_GROUP_ID,
  sendgridApiKey: process.env.SENDGRID_API_KEY,
}));
