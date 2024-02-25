import { Injectable } from '@nestjs/common';
import { SubscribeTo, SubscribeToFixedGroup } from '../kafka/kafka.decorator';
import { KafkaPayload } from '../kafka/kafka.message';

@Injectable()
export class ShipmentConsumer {
  /**
   * When group id is unique for every container.
   * @param payload
   */
  @SubscribeTo('hello.topic')
  helloSubscriber(payload: KafkaPayload) {
    console.log('[KAKFA-CONSUMER] Print message after receiving', payload);
  }
}
