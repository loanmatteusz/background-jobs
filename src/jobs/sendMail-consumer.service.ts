import { MailerService } from "@nestjs-modules/mailer";
import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { CreateUserDTO } from "src/create-user/create-user.dto";

@Processor('sendMailQueue')
class SendMailConsumer {
  
  constructor(private mailService: MailerService) {}

  @Process('sendMailJob')
  async sendMailJob(job: Job<CreateUserDTO>) {
    console.log({ job });
    const { data } = job;
    await this.mailService.sendMail({
      to: data.email,
      from: 'Loan Matteus <dev.29cz@gmail.com>',
      subject: `Welcome ${data.name}`,
      text: `Hi ${data.name} you account has been created!`,
    });
  }
}

export { SendMailConsumer }
