import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { MatDialog } from '@angular/material/dialog';
import { TerminosComponent } from '../terminos/terminos.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Registro } from '../shared/registro.model';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  public ownerForm: FormGroup;
  registro: Registro;
  checked_terminos: boolean = false;
  constructor(private Activatedroute:ActivatedRoute, private apiService: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.registro = new Registro();

    this.ownerForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      apellido: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      tipo_doc: new FormControl('d', [Validators.required]),
      num_doc: new FormControl('', [Validators.required]),
      telefono: new FormControl(''),
      correo: new FormControl('', [Validators.required, Validators.email]),
      clave: new FormControl(null, [Validators.required]),
      confirmaClave: new FormControl(null, [Validators.required]),
      check_termino: new FormControl(false, [Validators.requiredTrue])
    }, this.passwordsMatchValidator);

  }

  private passwordsMatchValidator(form: FormGroup) {
    if (form.get('clave') && form.get('confirmaClave')) {
        let result = form.get('clave').value === form.get('confirmaClave').value ? null : { mismatch: true };
        form.get('confirmaClave').setErrors(result);
        return result;
    }
    this.ownerForm.controls['confirmaClave'].setErrors(null);
    return null;
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

  registrar(ownerFormValue) {
    if (this.ownerForm.valid) {
      this.registro.nombre = ownerFormValue.nombre;
      this.registro.apellido = ownerFormValue.apellido;
      this.registro.tipo_doc = ownerFormValue.tipo_doc;
      this.registro.num_doc = ownerFormValue.num_doc;
      this.registro.telefono = ownerFormValue.telefono;
      this.registro.correo = ownerFormValue.correo;

      console.log('registro: ', this.registro);
      
      /*
      this.apiService.saveregistro(this.registro).subscribe((data: any) =>{
        console.log(data);
        if (data == 1)
          alert ("Se registró!");
        else
          alert ("NO se registró");
      });
      */
    }
  }
}
