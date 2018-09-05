import { TerminalService } from './terminal.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalComponent } from './terminal/terminal.component';

@NgModule({
  imports: [CommonModule],
  providers: [TerminalService],
  declarations: [TerminalComponent],
  exports: [TerminalComponent]
})
export class TerminalModule {}
