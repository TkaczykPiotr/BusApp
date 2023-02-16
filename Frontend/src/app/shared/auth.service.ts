import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
import {AppComponent} from '../app.component'

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

   getUid(): string {
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user?.uid;
    return uid!;

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
      localStorage.removeItem('conn');
      this.router.navigate(['SignIn']);
      window.location.reload();

    }, err => {
      alert(err.message);

    })
  }
}
