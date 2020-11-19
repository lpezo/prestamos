import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { MatDialog } from '@angular/material/dialog';
import { TerminosComponent } from '../terminos/terminos.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Solicitud } from '../shared/solicitud.model';

@Component({
  selector: 'app-solicitar',
  templateUrl: './solicitar.component.html',
  styleUrls: ['./solicitar.component.css']
})
export class SolicitarComponent implements OnInit {
  monto: Number;
  situaciones: [];
  frecuencias: [];
  public ownerForm: FormGroup;

  solicitud: Solicitud;

  checked_terminos: boolean = false;

  constructor(private Activatedroute:ActivatedRoute, private apiService: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.solicitud = new Solicitud();
    this.Activatedroute.queryParamMap
            .subscribe(params => { 
              this.solicitud.monto = +params.get('monto')||0;
              this.solicitud.cuotas = +params.get('cuotas')||0;
            });
    this.apiService.getSituaciones().subscribe((data: any)=>{  
      this.situaciones = data;
    });
    this.apiService.getFrecuencias().subscribe((data: any)=>{
      this.frecuencias = data;
    });

    this.ownerForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      dni: new FormControl('', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
      situacion: new FormControl(0),
      frecuencia: new FormControl(0),
      check_termino: new FormControl(false, [Validators.requiredTrue]),
      ingreso_Mensual: new FormControl(0),
      ingreso_Mensual_Hogar: new FormControl(0),
      celular: new FormControl(''),
      correo: new FormControl('', [Validators.required, Validators.email]),
      documento_1: new FormControl(''),
      documento_2: new FormControl('')
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

    /*
    dialogRef.afterClosed().subscribe(res => {
      
    });
    */
  }

  solicitar(ownerFormValue) {
    if (this.ownerForm.valid) {
      this.solicitud.nombre = ownerFormValue.nombre;
      this.solicitud.dni = ownerFormValue.dni;
      this.solicitud.codigo_Situacion_Laboral = ownerFormValue.situacion;
      this.solicitud.codigo_Frecuencia_Ingresos = ownerFormValue.frecuencia;
      this.solicitud.ingreso_Mensual = ownerFormValue.ingreso_Mensual;
      this.solicitud.ingreso_Mensual_Hogar = ownerFormValue.ingreso_Mensual_Hogar;
      this.solicitud.celular = ownerFormValue.celular;
      this.solicitud.correo = ownerFormValue.correo;
      this.solicitud.documento_1 = ownerFormValue.documento_1;
      this.solicitud.documento_2 = ownerFormValue.documento_2;

      console.log('solicitud: ', this.solicitud);

      this.apiService.saveSolicitud(this.solicitud).subscribe((data: any) =>{
        console.log(data);
        if (data == 1)
          alert ("Se registró!");
        else
          alert ("NO se registró");
      });
    }
  }

}
