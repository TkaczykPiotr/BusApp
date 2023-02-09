import { Component, Inject, OnInit } from '@angular/core';
import {FormGroup,  FormGroupDirective, FormControl, NgForm, Validators} from '@angular/forms'
import { AuthService } from 'src/app/shared/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{


  email : string = "";
  password : string = "";
  hide = true;
  constructor(private auth : AuthService) {}

  onLogin() {

  if(this.email == '' || this.password == ''){
      alert('Please enter email or password');
      return;
    }

    this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }





}
