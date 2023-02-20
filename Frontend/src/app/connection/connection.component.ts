import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Connection } from '../model/connection';
import { Ticket } from '../model/ticket';
import { AuthService } from '../shared/auth.service';
import { DataService } from '../shared/data.service';
import { PersonService } from '../shared/person.service';
import { TicketService } from '../shared/ticket.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DialogPersonalComponent } from '../dialog-personal/dialog-personal.component';
import { TicketMonthly } from '../model/ticket-monthly';
import { TicketMonthlyService } from '../shared/ticket-monthly.service';
import { DialogMonthlyComponent } from '../dialog-monthly/dialog-monthly.component';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  connectionList : Connection[] = [];

  month: '';

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

  constructor(private data : DataService,
    private ticketData : TicketService,
    private ticketMonthlyData: TicketMonthlyService,
    private auth : AuthService,
    private router: Router,
    private personData : PersonService,
    public dialog: MatDialog){

  }


  ngOnInit(): void {
    let valuesConn = JSON.parse(localStorage.getItem('conn') || "");
    this.getConnectionByName(valuesConn);
  }



  // getAllConnections() {
  //   this.data.getAllConnection().subscribe( res => {
  //     this.connectionList = res.map((e : any)  => {
  //       const data = e.payload.doc.data();
  //       data.id = e.payload.doc.id;
  //       return data;
  //     })
  //   }, err => {
  //     alert("No rail connections");

  //   })
  // }

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


  buyTicketMonthly(id : string, from: string, to: string, prize: string){
    if(localStorage.getItem('token') == null){
      this.router.navigate(['/SignIn']);
    }
    else
    {
     const idUid = this.auth.getUid();
     this.personData.checkPerson(idUid).subscribe(res => {
        if(res.length == 0){
          this.openDialog();
        }
        else
        {
          this.openDialogMonthly(id,from,to,prize);
          localStorage.removeItem('conn');
          this.router.navigate(['/Home']);
        }
      })
    }
  }


  buyTicket(id : string){
    if(localStorage.getItem('token') == null){
      this.router.navigate(['/SignIn']);
    }
    else
    {
     const idUid = this.auth.getUid();
     this.personData.checkPerson(idUid).subscribe(res => {
        if(res.length == 0){
          this.openDialog();
        }
        else
        {
          this.createTicket(id);
          localStorage.removeItem('conn');
          this.router.navigate(['/Home']);
        }
      })
    }
  }


  createTicket(id: string){
     this.ticketObj.id = '';
     this.ticketObj.idConnection = id;
     this.ticketObj.idUser = this.auth.getUid();
     this.ticketData.addTicket(this.ticketObj);
  }

  createTicketMonthly(id : string,from: string, to: string, prize: string, month: string){
    const prizeReduction = (parseInt(prize) * 30)*0.3
    const prizeToString: string = prizeReduction.toString();
    const idU = this.auth.getUid();
    let ticket : TicketMonthly = {id: '', idUser: idU, from: from, to: to, month: month, prize: prizeToString};
    this.ticketMonthlyData.addTicket(ticket);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogPersonalComponent);
    dialogRef.afterClosed().subscribe(result => {
        this.router.navigate(['/Account']);
    });
  }
  openDialogMonthly(id : string,from: string, to: string, prize: string): void {
    const dialogRef = this.dialog.open(DialogMonthlyComponent, {
      data: {name: this.month},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.month = result;
        this.createTicketMonthly(id,from,to,prize,result);
      }
      else{
        alert('Month is not selected');
      }


    });
  }


}


