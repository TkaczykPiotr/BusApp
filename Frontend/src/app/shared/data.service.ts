import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Connection } from '../model/connection';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore, private fireStorage : AngularFireStorage) { }


  getAllConnection(){
    return this.afs.collection('/Connection').snapshotChanges();

  }
}
