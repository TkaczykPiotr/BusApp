import { Component, Inject, OnInit } from '@angular/core';
import {FormGroup,  FormGroupDirective, FormControl, NgForm, Validators} from '@angular/forms'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{


  email = "";
  password = "";
  hide = true;
  constructor() {}

  onLogin(){
  console.log("zalogowalem");
  console.log(this.email);
  console.log(this.password);
  }

}
