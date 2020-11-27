import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { MatDialog } from '@angular/material/dialog';
import { TerminosComponent } from '../terminos/terminos.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Solicitud } from '../shared/solicitud.model';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';

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

  constructor(
    private Activatedroute:ActivatedRoute, 
    private apiService: ApiService, 
    public dialog: MatDialog, 
    private router: Router,
    private authenticate: AuthenticationService) { }

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
        if (data == null){
          alert("Ha ocurrido un error");
          return;
        }
          
        if (data.code == 100){
          //alert ("Se registró!");
          this.aceptado(data.status, data.id, this.solicitud.dni);
        }
        else if (data.code == 300){
          this.denegado(data.status)
        }
        else
        this.dialog.open(DialogConfirmComponent, {
          data: {num: 1, message: data.status}
        });
      });
    }
  }

  aceptado(msj: string, id: number, dni: string) {
    this.dialog
    .open(DialogConfirmComponent, {
      data: {num: 2, message: msj}
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.apiService.acceptSolicitud(1, id, dni).subscribe(resp=>{
            this.apiService.registrarPrestamo(id, dni).subscribe(resp2=>{
              if (this.authenticate.islogged())
                this.router.navigate(['/']);
              else
                this.router.navigate(['/login']);
            });
          })
      } else {
        this.apiService.acceptSolicitud(0, id, dni)
        this.router.navigate(['/']);
      }
    });
  }

  denegado(msj: string) {
    this.dialog
    .open(DialogConfirmComponent, {
      data: {num: 1, message: msj}
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      this.router.navigate(['/']);
    });
  }
}
