import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginUserComponent } from './login-user/login-user.component';
import { FormsModule } from '@angular/forms'
@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,   
  ],
  declarations: [LoginUserComponent]
})
export class LoginModule { }
