import { Module } from '@nestjs/common';
import { TerminalController } from './terminal.controller';

@Module({
  controllers: [TerminalController],
})
export class TerminalModule {}
