import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.component.html',
  styleUrls: ['./terminos.component.css']
})

export class TerminosComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TerminosComponent>)
  { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}