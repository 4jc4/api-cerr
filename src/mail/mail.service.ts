import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMailForgotPassword(user: UserEntity, token: string) {
    const url = `example.com/auth/reset?token=${token}`;
    await this.mailerService.sendMail({
      subject: 'Recuperação de senha',
      to: user.email,
      template: 'forgot',
      context: { name: user.name, url },
    });
  }
}
