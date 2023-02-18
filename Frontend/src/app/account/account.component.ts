import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from '../model/person';
import { AuthService } from '../shared/auth.service';
import { PersonService } from '../shared/person.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  personList: Person[] = []

  name = "";
  surname = "";
  age = "";

  isPerson = false;

  constructor(private router: Router, private personData : PersonService,  private auth : AuthService){

  }


  ngOnInit(): void {

    const id = this.auth.getUid();
    this.personData.checkPerson(id).subscribe((res: any) => {
      if(res.length < 1){
        this.isPerson = false;
      }
      else{
        this.isPerson = true;

        this.personList = res.map((e : any)  => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })

      }

    });
    console.log(this.personList);
  }

  savePersonalData(){
   const id = this.auth.getUid();
   let person : Person = {id: '',idUser: id, name: this.name, surname: this.surname, age: this.age}
   this.personData.addPerson(person);
   this.router.navigate(['/Home']);
  }

  changeData(){
    //moze zrobie
  }

}
