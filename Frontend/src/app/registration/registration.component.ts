import { Component, OnInit } from '@angular/core';
import {FormGroup,  FormGroupDirective, FormControl, NgForm, Validators} from '@angular/forms'
import { NavigationEnd, Router } from '@angular/router';


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

  constructor(private router: Router) {

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
    console.log(this.password);
    console.log(this.passwordpwd);

  if(this.password===this.passwordpwd){
    console.log("zarejestrowalem");
    this.router.navigate(['SignIn']);

  }
  else
  {
    console.log("hasła nie są takie same");
  }
  }

}
