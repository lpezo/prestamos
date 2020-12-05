import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../shared/user.models';

@Component({
  selector: 'app-passarela',
  templateUrl: './passarela.component.html',
  styleUrls: ['./passarela.component.css']
})
export class PassarelaComponent implements OnInit {
  public ownerForm: FormGroup;
  public user: User;
  constructor(
    public dialogo: MatDialogRef<PassarelaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.user = this.data.user;
    this.ownerForm = new FormGroup({
      correo: new FormControl(this.user.correo, [Validators.required, Validators.email]),
      cuenta: new FormControl(this.user.cuenta_bancaria, [Validators.required])
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.ownerForm.controls[controlName].hasError(errorName);
  }

  proceder_pago(item): void {
    this.dialogo.close(true);
  }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }

}
