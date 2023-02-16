import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Ticket } from '../model/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private afs : AngularFirestore, private fireStorage : AngularFireStorage) { }


  addTicket(ticket: Ticket){
    ticket.id = this.afs.createId();
    return this.afs.collection('/Tickets').add(ticket);
  }


  getAllTicketByUserId(id : string){
    return this.afs.collection('/Tickets', ref => ref.where('idUser', '==', id)).snapshotChanges();
  }

}
