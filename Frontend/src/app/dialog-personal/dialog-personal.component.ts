import { Component } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-personal',
  templateUrl: './dialog-personal.component.html',
  styleUrls: ['./dialog-personal.component.css']
})
export class DialogPersonalComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogPersonalComponent>,

  ) {}

  onClick(): void {
    this.dialogRef.close();
  }
}
