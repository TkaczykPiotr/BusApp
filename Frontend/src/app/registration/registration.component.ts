import { Component, OnInit } from '@angular/core';
import {FormGroup,  FormGroupDirective, FormControl, NgForm, Validators} from '@angular/forms'
import {ErrorStateMatcher} from '@angular/material/core';
import { NavigationEnd, Router } from '@angular/router';





export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  //loginForm : FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  passwordpwd = new FormControl('', [Validators.required, Validators.minLength(6)]);
  matcher = new MyErrorStateMatcher();
  hide = true;
  constructor(private router: Router) {

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
