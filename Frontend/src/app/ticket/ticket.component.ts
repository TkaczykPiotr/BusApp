import { ArrayDataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Connection } from '../model/connection';
import { Ticket } from '../model/ticket';
import { AuthService } from '../shared/auth.service';
import { DataService } from '../shared/data.service';
import { TicketService } from '../shared/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  ticketList : Ticket [] = [];

  connectionList : Connection[] = [];
  displayedColumns: string[] = ['date', 'from', 'to', 'timeFrom', 'timeTo', 'prize', 'button'];
  //connectionList: ArrayDataSource<Connection> = new ArrayDataSource<Connection>([]);

  constructor(private ticketData : TicketService, private auth : AuthService, private connectionData : DataService){

  }
  ngOnInit(): void {
    this.getTicket();
  }

  claimTrackBy(index: number, item: any) {
    return item.date;
  }

  getTicket(){
    const uid = this.auth.getUid();
    let tmp : any;
    this.ticketData.getAllTicketByUserId(uid).subscribe( {next : (res : any) => {
      if(res.length < 1){
        alert("No ticket");
      }
      this.ticketList = res.map((e : any) => e.payload.doc.data());
      console.log('srodeczek',this.ticketList);
      this.getConnection();
    },error : err => {
      alert("No ticket");
    }}
    )
    console.log('moze dalej',this.ticketList);
  }

  getConnection() {
    //let data: Connection[] = [];

    this.ticketList.map(e => {
      this.connectionData.getConnectionById(e.idConnection).subscribe((res : any) => {
        this.connectionList.push(res);
      });
    });
    //this.connectionList = new ArrayDataSource<Connection>(data);
    console.log('wyswietlam; ', this.connectionList);

  }


}
