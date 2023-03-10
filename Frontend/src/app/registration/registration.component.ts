import { Component, OnInit } from '@angular/core';
import {FormGroup,  FormGroupDirective, FormControl, NgForm, Validators} from '@angular/forms'
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  //loginForm : FormGroup;
  email = "";
  password = "";
  passwordpwd = "";
  hide = true;
  hideTwo = true;

  constructor(private auth : AuthService ) {

  }


  hidePassword(){
    if(this.hide == true)
      this.hide = false;
    else
      this.hide = true;
  }


  hidePasswordTwo(){
    if(this.hideTwo == true)
      this.hideTwo = false;
    else
      this.hideTwo = true;
  }

  onRegistry(){

    if(this.email == '' || this.password == '' || this.passwordpwd == ''){
      alert('Please enter email or password');
      return;
    }

  if(this.password != this.passwordpwd){
    alert('The passwords are not the same');
    return;
  }
  else
  {
    this.auth.register(this.email, this.password);
    this.email = '';
    this.password = '';
    this.passwordpwd = '';

  }
  }

}
