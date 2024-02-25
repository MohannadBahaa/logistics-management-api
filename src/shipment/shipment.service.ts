import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { Model } from 'mongoose';
import { Shipment } from './schemas/shipment.schema';
import { KafkaService } from '../kafka/kafka.service';
import { KafkaPayload } from '../kafka/kafka.message';

@Injectable()
export class ShipmentService {
  constructor(private readonly kafkaService: KafkaService) {}

  getHello() {
    return {
      value: 'hello world',
    };
  }

  async send() {
    const message = {
      value: 'Message send to Kakfa Topic',
    };

    const payload: KafkaPayload = {
      messageId: '' + new Date().valueOf(),
      body: message,
      messageType: 'Say.Hello',
      topicName: 'hello.topic',
    };

    const value = await this.kafkaService.sendMessage('hello.topic', payload);
    console.log('kafka status ', value);
    return message;
  }
}
