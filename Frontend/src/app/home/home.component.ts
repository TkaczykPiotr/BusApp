import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  fromCity = "";
  toCity = "";

  constructor(private router: Router){

  }

  ngOnInit(): void {
    if(localStorage.getItem('conn') !== null){
      this.router.navigate(['/Connection']);
    }
  }

  searchConnection(){
   let conn = {from: this.fromCity, to: this.toCity}
   localStorage.setItem('conn', JSON.stringify(conn));
   this.router.navigate(['/Connection']);

  };
}
