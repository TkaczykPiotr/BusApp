import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Connection } from '../model/connection';
import { Ticket } from '../model/ticket';
import { AuthService } from '../shared/auth.service';
import { DataService } from '../shared/data.service';
import { TicketService } from '../shared/ticket.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent {

  connectionList : Connection[] = [];

  ticketObj: Ticket = {
    id: '',
    idConnection: '',
    idUser: ''
  }

  id : string = '';
  date : string = '';
  from : string = '';
  to : string = '';
  prize: string = '';
  timeFrom: string = '';
  timeTo: string = '';

  valuesConn = {};

  constructor(private data : DataService, private ticketData : TicketService, private auth : AuthService, private router: Router){

      let valuesConn =   JSON.parse(localStorage.getItem('conn') || "");
      this.getConnectionByName(valuesConn);



  }

  getAllConnections() {
    this.data.getAllConnection().subscribe( res => {
      this.connectionList = res.map((e : any)  => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

      //console.log(this.connectionList);

    }, err => {
      alert("No rail connections");

    })
  }

  getConnectionByName(conn?: any){
    this.data.getConnectionByName(conn.from, conn.to).subscribe( res => {
      if(res.length < 1){
        alert("No rail connections");
      }
      this.connectionList = res.map((e : any)  => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;

      })
    }, err => {
      alert("No rail connections");

    })
  }


  buyTicket(id : string){
    if(localStorage.getItem('token') == null){
      this.router.navigate(['/SignIn']);
    }
    else
    {
      this.createTicket(id);
      this.router.navigate(['/Connection']);
    }
  }


  createTicket(id: string){
     this.ticketObj.id = '';
     this.ticketObj.idConnection = id;
     this.ticketObj.idUser = this.auth.getUid();

     console.log(this.ticketObj);
    this.ticketData.addTicket(this.ticketObj);

  }


}
