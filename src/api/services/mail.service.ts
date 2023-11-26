import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailOptionsDto } from '../dto/mail-options.dto';
import { resolve } from 'path';

@Injectable()
export class MailService {
  constructor (
    private mailer: MailerService,
  ) {}

  async send ({ to, subject, message, link }: MailOptionsDto): Promise<void> {
    await this.mailer.sendMail({
      to,
      subject,
      template: resolve('./mail/templates/template.hbs'),
      context: { message, link },
    });
  }
}