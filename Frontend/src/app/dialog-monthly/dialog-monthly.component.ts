import { Component, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


export interface DialogMonthlyData {
  name: string
}


@Component({
  selector: 'app-dialog-monthly',
  templateUrl: './dialog-monthly.component.html',
  styleUrls: ['./dialog-monthly.component.css']
})
export class DialogMonthlyComponent {
  selectedValue: string;

 months: DialogMonthlyData[] = [
    {name: 'January'},
    {name: 'February'},
    {name: 'March'},
    {name: 'April'},
    {name: 'May'},
    {name: 'June'},
    {name: 'July'},
    {name: 'August'},
    {name: 'September'},
    {name: 'October'},
    {name: 'November'},
    {name: 'December'},
  ];
  constructor(
    public dialogRef: MatDialogRef<DialogMonthlyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogMonthlyData,

  ) {}

  onClick(): void {
    this.dialogRef.close(this.selectedValue);
  }
}
