import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatDialog } from '@angular/material/dialog';
import { TerminosComponent } from '../terminos/terminos.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Registro } from '../shared/registro.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  public ownerForm: FormGroup;
  registro: Registro;
  checked_terminos: boolean = false;
  constructor(
    private apiService: ApiService, 
    public dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registro = new Registro();

    this.ownerForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      apellido: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      //tipo_doc: new FormControl('d', [Validators.required]),
      dni: new FormControl('', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
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
      this.registro.nombres = ownerFormValue.nombre;
      this.registro.apellidos = ownerFormValue.apellido;
      //this.registro.tipo_doc = ownerFormValue.tipo_doc;
      this.registro.dni = ownerFormValue.dni;
      this.registro.telefono = ownerFormValue.telefono;
      this.registro.correo = ownerFormValue.correo;
      this.registro.clave = ownerFormValue.clave;

      console.log('registro: ', this.registro);
      
      this.apiService.saveRegistro(this.registro).subscribe((data: any) =>{
        console.log(data);
        if (data == 1){
          this.toastr.error("Se registró el usuario", "Message");
          this.router.navigate(['/']);
        }
        else
          this.toastr.error("NO se registró", "Error");
      });

    }
  }
}
