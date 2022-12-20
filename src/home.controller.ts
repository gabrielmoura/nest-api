import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class HomeController {
  @Get()
  async listUsuarios() {
    return 'Bem vindo';
  }
}
