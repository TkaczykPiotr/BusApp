import { Component } from '@angular/core';
import { Connection } from '../model/connection';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent {

  connectionList : Connection[] = [];

  id : string = '';
  date : string = '';
  from : string = '';
  to : string = '';
  prize: string = '';
  timeFrom: string = '';
  timeTo: string = '';

  valuesConn = {};

  constructor(private data : DataService){

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


}
