import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer'; 
import { CreateUserController } from './create-user/create-user.controller';
import { SendMailProducerService } from './jobs/sendMail-producer.service';
import { SendMailConsumer } from './jobs/sendMail-consumer.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    BullModule.registerQueue({
      name: 'sendMailQueue',
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
      }
    }),
  ],
  controllers: [CreateUserController],
  providers: [
    SendMailProducerService,
    SendMailConsumer,
  ],
})
export class AppModule {}
