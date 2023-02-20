import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AuthService } from '../shared/auth.service';
import { Connection } from '../model/connection';
import { Person } from '../model/person';
import { DataService } from '../shared/data.service';
import { PersonService } from '../shared/person.service';

@Component({
  selector: 'app-generatedpdf',
  templateUrl: './generatedpdf.component.html',
  styleUrls: ['./generatedpdf.component.css']
})
export class GeneratedpdfComponent implements OnInit {


  @ViewChild('invoice') invoiceElement!: ElementRef;
  connectionList : Connection[] = [];
  personList : Person[] = [];
  date = this.getCurrentDate();
  tax = 0;
  prizeBefore = 0;
  constructor(private auth: AuthService, private connectionData : DataService, private personData : PersonService) { }

  ngOnInit(): void {
    const idConn = localStorage.getItem('pdf')!;
    const idUser = this.auth.getUid();
    this.getConnectionById(idConn);
    this.getPersonById(idUser);
    localStorage.removeItem('pdf');

  }

  public generatePDF(): void {

    let DATA: any = this.invoiceElement.nativeElement;
    html2canvas(DATA).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
      const fileWidth = 200;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
      let PDF = new jsPDF('p', 'mm', 'a4',);
      PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, 5, fileWidth, generatedImageHeight,);
      PDF.html(this.invoiceElement.nativeElement.innerHTML)
      PDF.save('ticket.pdf');
    });
  }

  getConnectionById(id: string){
    this.connectionData.getConnectionById(id).subscribe((res: any) => {
      this.prizeBefore = parseInt(res.prize) * 0.9;
      this.tax = parseInt(res.prize) * 0.1;
      this.connectionList.push(res);
  });
  }

  getPersonById(id: string){
    this.personData.checkPerson(id).subscribe((res: any) => {
        this.personList = res.map((e : any)  => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
    });
  }
  getCurrentDate(): string {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

}



