import { NgModule } from '@angular/core';
import { DropDownComponent } from './drop-down/drop-down.component';
import { LogComponent } from './log/log.component';
import { TerminalModule } from './terminal/terminal.module';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [DropDownComponent, LogComponent],
  imports: [TerminalModule, CommonModule, MatExpansionModule],
  exports: [DropDownComponent, LogComponent]
})
export class SharedModule {}
