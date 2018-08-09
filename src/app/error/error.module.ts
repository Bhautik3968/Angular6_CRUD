import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorRoutingModule } from './error-routing.module';
import { ErrorGlobalComponent } from './error-global/error-global.component';

@NgModule({
  imports: [
    CommonModule,
    ErrorRoutingModule
  ],
  declarations: [ErrorGlobalComponent]
})
export class ErrorModule { }
