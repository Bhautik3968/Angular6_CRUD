import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { TestAPIService } from '../../test-api.service'
import { User } from '../user'

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  user: User;
  isValidUser: boolean = true;
  constructor(private router: Router, private service: TestAPIService) { }
  ngOnInit() {
    this.user = new User();
  }
  onSubmit(formdata) {
    this.service.AuthenticateUser(formdata).subscribe((data: any) => {           
      if(data)
      {
        sessionStorage.setItem('userToken', data.access_token);
        this.isValidUser = true;          
        this.router.navigate(['product']);       
      }
      else
      {
        this.isValidUser = false;
      }      
    });
  }
}