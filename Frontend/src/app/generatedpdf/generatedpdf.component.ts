import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AuthService } from '../shared/auth.service';
import { Connection } from '../model/connection';
import { Person } from '../model/person';
import { DataService } from '../shared/data.service';
import { PersonService } from '../shared/person.service';
import { TicketMonthlyService } from '../shared/ticket-monthly.service';
import { TicketMonthly } from '../model/ticket-monthly';




@Component({
  selector: 'app-generatedpdf',
  templateUrl: './generatedpdf.component.html',
  styleUrls: ['./generatedpdf.component.css']
})
export class GeneratedpdfComponent implements OnInit {


  @ViewChild('invoice') invoiceElement!: ElementRef;
  public myQRCode: string = this.generateNumber();
  connectionList : Connection[] = [];
  personList : Person[] = [];
  ticketList : TicketMonthly[] = [];
  date = this.getCurrentDate();
  tax = 0;
  prizeBefore = 0;
  qrcodeImage: string;
  isTicket: boolean = false;
  constructor(private auth: AuthService,
    private connectionData : DataService,
    private personData : PersonService,
    private ticketData : TicketMonthlyService
   ) { }

  ngOnInit(): void {
    if(localStorage.getItem('pdf') != null){
      const idConn = localStorage.getItem('pdf')!;
      this.getConnectionById(idConn);
      this.isTicket = true;
      localStorage.removeItem('pdf');
    }
    if(localStorage.getItem('pdfM') != null){
      const idTick = localStorage.getItem('pdfM')!;
      this.getTicketById(idTick);
      this.isTicket = false;
      localStorage.removeItem('pdfM');

    }

    const idUser = this.auth.getUid();
    this.getPersonById(idUser);



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

  getTicketById(id: string){
    this.ticketData.getTicketById(id).subscribe((res: any) => {
      this.ticketList = res.map((e : any)  => {
        const data = e.payload.doc.data();
        this.prizeBefore = parseInt(data.prize) * 0.9;
        this.tax = parseInt(data.prize) * 0.1;
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

  generateNumber(){
    const max = 100000000;
    return Math.floor(Math.random() * max).toString();

  }



}



