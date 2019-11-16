import { NgModule } from '@angular/core';
import { BuildComponent } from './build/build.component';
import { FlagsComponent } from './flags/flags.component';
import { CliServeComponent } from './serve/serve.component';
import { CliCreateComponent } from './create/create.component';
import { CliTestComponent } from './test/test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from '../mat.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
  declarations: [
    BuildComponent,
    CliCreateComponent,
    FlagsComponent,
    CliServeComponent,
    CliTestComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    CommonModule,
    SharedModule
  ],
  exports: [
    CliServeComponent,
    CliCreateComponent,
    CliTestComponent,
    BuildComponent
  ]
})
export class CliModule {}
