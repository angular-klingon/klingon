import { Controller, Get } from '@nestjs/common';

@Controller()
export class TerminalController {
  @Get('/')
  getHello() {
    return 'Hello World!SDsd';
  }
}
