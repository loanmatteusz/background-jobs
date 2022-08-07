import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { CreateUserDTO } from "src/create-user/create-user.dto";

@Injectable()
class SendMailProducerService {
  constructor(@InjectQueue('sendMailQueue') private queue: Queue) {}
  async sendMail(createUser: CreateUserDTO) {
    await this.queue.add('sendMailJob', createUser);
  }
}

export { SendMailProducerService }
