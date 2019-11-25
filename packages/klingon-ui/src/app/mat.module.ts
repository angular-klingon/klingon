import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgModule } from '@angular/core';

const imports = [
  MatTabsModule,
  MatIconModule,
  MatToolbarModule,
  MatInputModule,
  MatTooltipModule,
  MatCheckboxModule,
  MatSelectModule,
  MatGridListModule,
  MatButtonModule,
  MatCardModule,
  MatMenuModule,
  MatListModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatSlideToggleModule,
  MatSidenavModule
];

@NgModule({
  imports,
  exports: imports
})
export class MatModule {}
