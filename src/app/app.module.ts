import { BrowserModule } from '@angular/platform-browser';
import {MatDialogModule} from '@angular/material'
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { UserloginComponent } from './userlogin/userlogin.component';
import { MainpageComponent } from './mainpage/mainpage.component';

import { ProductDetailComponent } from './product-detail/product-detail.component'
import { AuthGuard } from './auth.guard'
import { AuthInterceptor } from './auth.interceptor'

const appRoutes: Routes = [
  {
    path: '',
    component: UserloginComponent
  },
  {
    path: 'app-mainpage',
    component: MainpageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app-product-detail',
    component: ProductDetailComponent,
    canActivate: [AuthGuard]    
  }
];

@NgModule({
  declarations: [
    AppComponent,
    UserloginComponent,
    MainpageComponent,
    ProductDetailComponent
  ],  
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule
  ],
   providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }    
  ], 
  /* entryComponents:[
    ProductDetailComponent    
  ], */
  bootstrap: [AppComponent]
})
export class AppModule { }
