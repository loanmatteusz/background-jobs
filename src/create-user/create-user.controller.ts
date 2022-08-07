import { Body, Controller, Post } from '@nestjs/common';
import { SendMailProducerService } from 'src/jobs/sendMail-producer.service';
import { CreateUserDTO } from './create-user.dto';

@Controller('create-user')
export class CreateUserController {
  
  constructor(private sendMailProducerService: SendMailProducerService) {}

  @Post('/')
  createUser(
    @Body() createUser: CreateUserDTO
  ) {
    this.sendMailProducerService.sendMail(createUser);
    return createUser;
  }
}
