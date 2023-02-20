
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Connection } from '../model/connection';
import { Ticket } from '../model/ticket';
import { TicketMonthly } from '../model/ticket-monthly';
import { AuthService } from '../shared/auth.service';
import { DataService } from '../shared/data.service';
import { TicketMonthlyService } from '../shared/ticket-monthly.service';
import { TicketService } from '../shared/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  ticketList : Ticket [] = [];
  ticketMonthlyList : TicketMonthly [] = [];
  connectionList : Connection[] = [];

  isTicket = false;

  constructor(
    private ticketData : TicketService,
    private auth : AuthService,
    private connectionData : DataService,
    private ticketMonthlyData : TicketMonthlyService,
    private router : Router){

  }
  ngOnInit(): void {
    this.getTicket();
    this.getTicketMonthly();

  }

  getTicket(){
    const uid = this.auth.getUid();
    this.ticketData.getAllTicketByUserId(uid).subscribe( {next : (res : any) => {
      if(res.length < 1){
        this.isTicket = true;
      }
      this.ticketList = res.map((e : any) => e.payload.doc.data());
      this.getConnection();
    },error : err => {
      alert("No ticket");
    }}
    )
  }

  getTicketMonthly(){
    const uid = this.auth.getUid();
    this.ticketMonthlyData.getAllTicketByUserId(uid).subscribe( {next : (res : any) => {
      if(res.length < 1){
        this.isTicket = true;
      }
      this.ticketMonthlyList = res.map((e : any) => e.payload.doc.data());
    },error : err => {
      alert("No ticket");
    }}
    )
  }

  getConnection() {

    this.ticketList.map(e => {
      this.connectionData.getConnectionById(e.idConnection).subscribe((res : any) => {
        this.connectionList.push({... res});

      });
    });
  }

  downloadTicket(id: string){
    let data: string = id;
    localStorage.setItem('pdf', data);
    this.router.navigate(['Generate']);
  }

  downloadTicketMonthly(id: string){
    let data: string = id;
    localStorage.setItem('pdfM', data);
    this.router.navigate(['Generate']);
  }

}
