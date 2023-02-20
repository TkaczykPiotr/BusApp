import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TicketMonthly } from '../model/ticket-monthly';

@Injectable({
  providedIn: 'root'
})
export class TicketMonthlyService {

  constructor(private afs : AngularFirestore) { }

  addTicket(ticket: TicketMonthly){
    ticket.id = this.afs.createId();
    return this.afs.collection('/TicketsMonthly').add(ticket);
  }


  getAllTicketByUserId(id : string){
    return this.afs.collection('TicketsMonthly', ref => ref.where('idUser', '==', id)).snapshotChanges();
  }

  getTicketById(id : string){
    return this.afs.collection('TicketsMonthly', ref => ref.where('id', '==', id)).snapshotChanges();
  }


}
