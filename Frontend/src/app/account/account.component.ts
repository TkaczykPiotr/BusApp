import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from '../model/person';
import { AuthService } from '../shared/auth.service';
import { PersonService } from '../shared/person.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  name = "";
  surname = "";
  age = "";

  constructor(private router: Router, private personData : PersonService,  private auth : AuthService){

  }

  savePersonalData(){
   const id = this.auth.getUid();
   let person : Person = {id: '',idUser: id, name: this.name, surname: this.surname, age: this.age}
   this.personData.addPerson(person);
   this.router.navigate(['/Home']);
  };
}
