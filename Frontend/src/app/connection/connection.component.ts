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

  constructor(private data : DataService){
    this.getAllConnections();

  }


  getAllConnections() {
    this.data.getAllConnection().subscribe( res => {
      this.connectionList = res.map((e : any)  => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

      console.log(this.connectionList);

    }, err => {
      alert("No rail connections");

    })
  }


}
