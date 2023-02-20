import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Person } from '../model/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private afs : AngularFirestore) { }


  addPerson(person: Person){
    person.id = this.afs.createId();
    return this.afs.collection('/Person').add(person);
  }

  checkPerson(id: string){
    return this.afs.collection('Person', ref => ref.where('idUser', '==', id)).snapshotChanges();
  }


}
