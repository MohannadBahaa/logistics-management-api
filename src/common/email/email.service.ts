import { Injectable } from '@nestjs/common';
import { MailDataRequired } from '@sendgrid/mail';
import { SendGridClient } from './sendgrid-client';

@Injectable()
export class EmailService {
  constructor(private readonly sendGridClient: SendGridClient) {}

  async sendTestEmail(
    recipient: string,
    body = 'This is a test mail',
  ): Promise<void> {
    const mail: MailDataRequired = {
      to: recipient,
      from: 'mhd.almusa@gmail.com', //Approved sender ID in Sendgrid
      subject: 'Test email',
      content: [{ type: 'text/plain', value: body }],
    };
    await this.sendGridClient
      .send(mail)
      .catch(() => new Error('email error'))
      .then(() => console.log('email has been send'));
  }
}
