import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatModule } from './mat.module';

import { CliService } from './cli/cli.service';
import { TerminalModule } from './_shared/terminal/terminal.module';
import {
  AppComponent,
  SnackBarErrorComponent,
  SnackBarSuccessComponent
} from './app.component';
import { DropDownComponent } from './_shared/drop-down/drop-down.component';
import { CliCreateComponent } from './cli/create/create.component';
import { CliServeComponent } from './cli/serve/serve.component';
import { BuildComponent } from './cli/build/build.component';
import { FlagsComponent } from './cli/flags/flags.component';
import { CliTestComponent } from './cli/test/test.component';
import { LogComponent } from './_shared/log/log.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    DropDownComponent,
    CliCreateComponent,
    CliServeComponent,
    BuildComponent,
    FlagsComponent,
    CliTestComponent,
    LogComponent,
    SnackBarSuccessComponent,
    SnackBarErrorComponent
  ],
  entryComponents: [SnackBarSuccessComponent, SnackBarErrorComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    TerminalModule,
    BrowserAnimationsModule,
    MatModule,
    MatExpansionModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [CliService],
  bootstrap: [AppComponent]
})
export class AppModule {}
