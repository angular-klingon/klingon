import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatModule } from './mat.module';

import { CliService } from './cli/cli.service';
import { AppComponent } from './app.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DashboardModule } from './dashboard/dashboard.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { SnackBarSuccessComponent, SnackBarErrorComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    SnackBarSuccessComponent,
    SnackBarErrorComponent
  ],
  entryComponents: [SnackBarSuccessComponent, SnackBarErrorComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatModule,
    MatExpansionModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    DashboardModule,
    AppRoutingModule,
    HomeModule
  ],
  providers: [CliService],
  bootstrap: [AppComponent]
})
export class AppModule {}
