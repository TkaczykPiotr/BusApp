import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router : Router) {

  }

  login(email : string, password : string){
    this.fireauth.signInWithEmailAndPassword(email,password).then( () =>{
      localStorage.setItem('token', 'true');
      this.router.navigate(['Home']); // <- przenoszenie do strony gdy logowanie dziala
    }, err => {
      alert(err.message);
      this.router.navigate(['SignIn']);
    }

    )
  }

  register(email : string, password : string){
    this.fireauth.createUserWithEmailAndPassword(email, password).then( () =>{
      alert('Registration Succesful')
      this.router.navigate(['SignIn']);
    }, err => {
      alert(err.message);
      this.router.navigate(['SignUp']);
    }

    )
  }

  // wy;logowanie
  logout(){
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['SignIn']);
    }, err => {
      alert(err.message);

    })
  }
}