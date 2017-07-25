import { CliService } from './cli/cli.service';
import { TerminalComponent } from './terminal/terminal/terminal.component';
import { TerminalModule } from './terminal/terminal.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MdTabsModule } from '@angular/material';
import { MdIconModule } from '@angular/material';
import { MdToolbarModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MdInputModule } from '@angular/material';
import { MdTooltipModule } from '@angular/material';
import {MdCheckboxModule} from '@angular/material';
import {MdSelectModule} from '@angular/material';
import {MdGridListModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';
import {MdCardModule} from '@angular/material';
import {MdMenuModule} from '@angular/material';
import {MdListModule} from '@angular/material';

import { AppComponent } from './app.component';
import { DropDownComponent } from './drop-down/drop-down.component';
import { CliCreateComponent } from './cli/create/create.component';
import { CliServeComponent } from './cli/serve/serve.component';

@NgModule({
  declarations: [
    AppComponent,
    DropDownComponent,
    CliCreateComponent,
    CliServeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    TerminalModule,
    NoopAnimationsModule,
    MdTabsModule,
    MdIconModule,
    MdToolbarModule,
    MdInputModule,
    MdTooltipModule,
    MdCheckboxModule,
    MdSelectModule,
    MdGridListModule,
    MdButtonModule,
    MdCardModule,
    MdMenuModule,
    MdListModule
  ],
  providers: [CliService],
  bootstrap: [AppComponent]
})
export class AppModule { }
