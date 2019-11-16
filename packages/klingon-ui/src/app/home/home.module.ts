import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CliModule } from '../cli/cli.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { TerminalModule } from '../_shared/terminal/terminal.module';
import { SharedModule } from '../_shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    CliModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatTabsModule,
    TerminalModule,
    SharedModule,
    MatCardModule,
    MatButtonModule,
    RouterModule
  ]
})
export class HomeModule { }
