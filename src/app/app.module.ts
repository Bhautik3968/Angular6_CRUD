import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material'
import { NgModule, ErrorHandler } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard'
import { AuthInterceptor } from './auth.interceptor'
import { GlobalErrorHandlerService } from './error/global-error-handler.service';
const appRoutes: Routes = [  
  {
    path: 'product',
    loadChildren:'./product/product.module#ProductModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren:'./login/login.module#LoginModule'
  },
  {
    path: 'error/:id',
    loadChildren:'./error/error.module#ErrorModule',
    canActivate: [AuthGuard]    
  },
  {
    path: '**',
    redirectTo:'login',
    pathMatch:'full'    
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,   
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
