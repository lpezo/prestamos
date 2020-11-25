import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatDialog } from '@angular/material/dialog';
import { TerminosComponent } from '../terminos/terminos.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Registro } from '../shared/registro.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../shared/authentication.service';
import { User } from '../shared/user.models';

@Component({
  selector: 'app-asociar',
  templateUrl: './asociar.component.html',
  styleUrls: ['./asociar.component.css']
})
export class AsociarComponent implements OnInit {

  public ownerForm: FormGroup;
  registro: Registro;
  checked_terminos: boolean = false;
  currentUser: User;

  constructor(
    private apiService: ApiService, 
    public dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,
    private authenticate: AuthenticationService
  ) { this.authenticate.currentUser.subscribe(x => this.currentUser = x);}

  ngOnInit(): void {
    this.registro = new Registro();
    
    this.ownerForm = new FormGroup({
      nombre: new FormControl({value: this.currentUser.nombres, disabled:true}),
      apellido: new FormControl({value: this.currentUser.apellidos, disabled:true}),
      dni: new FormControl({value: this.currentUser.dni, disabled:true}),
      telefono: new FormControl({value: this.currentUser.telefono, disabled:true}),
      correo: new FormControl({value: this.currentUser.correo, disabled:true}),
      interbancario: new FormControl('',[Validators.required, Validators.minLength(10)]),
      check_termino: new FormControl(false, [Validators.requiredTrue])
    });

  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.ownerForm.controls[controlName].hasError(errorName);
  }

  openDialog($event): void {
    $event.preventDefault();
    const dialogRef = this.dialog.open(TerminosComponent, {
      width: '400px',
      data: { }
    });
  }  

  asociar(ownerFormValue) {
    if (this.ownerForm.valid) {
      this.registro.dni = this.currentUser.dni;
      this.registro.interbancario = ownerFormValue.interbancario;

      let reg = { dni: this.registro.dni, interbancario: this.registro.interbancario};
      console.log('send interbancario', reg);
      /*
      this.apiService.sendInterbancario(reg).subscribe((data: any) =>{
        console.log(data);
        if (data == 1){
          this.toastr.error("Se registró el código interbancario", "Message");
          this.router.navigate(['/']);
        }
        else
          this.toastr.error("NO se registró", "Error");
      });
      */
    }
  }

}
