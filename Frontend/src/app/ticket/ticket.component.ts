import { Component } from '@angular/core';
import { Ticket } from '../model/ticket';
import { AuthService } from '../shared/auth.service';
import { TicketService } from '../shared/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent {

  ticketList : Ticket [] = [];



  constructor(private ticketData : TicketService, private auth : AuthService){



  }

  ngOnInit(): void {
    this.getTicket();
  }


  getTicket(){
    const uid = this.auth.getUid();
    console.log('udidd'+ uid);
    this.ticketData.getAllTicketByUserId(uid).subscribe( res => {
      this.ticketList = res.map((e : any)  => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        console.log('dane'+data);
        return data;
      })

    }, err => {
      alert("No ticket");

    })
  }


}
