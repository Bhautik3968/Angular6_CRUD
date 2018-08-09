import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorGlobalComponent } from './error-global/error-global.component';

const routes: Routes = [
  {
    path: '',
    component: ErrorGlobalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
