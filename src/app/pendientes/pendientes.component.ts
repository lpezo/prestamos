import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { PassarelaComponent } from '../passarela/passarela.component';
import { AuthenticationService } from '../shared/authentication.service';
import { CuotaPendiente } from '../shared/cuotaPendiente.model';
import { User } from '../shared/user.models';

export interface Pendiente {
  num_documento: string;
  moneda: string;
  importe: number;
  fecha_ven: Date;
  interes: number;
  interes_mor: number;
  total: number;
}

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.css']
})
export class PendientesComponent implements OnInit {
  user: User;  
  displayedColumns: string[] = ['numeroDocumento', 'moneda', 'importe', 'fechaVencimiento', 'interes', 'interesMoratorio', 'total', 'action'];
  pendientes: CuotaPendiente[] = [];
  procesando: Boolean = true;

  constructor(
    private authenticate: AuthenticationService,
    private apiService: ApiService,
    private dialog: MatDialog,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.user = this.authenticate.currentUserValue;
    this.refrescar();
  }

  refrescar(): void {
    this.procesando = true;
    this.apiService.getCuotaPendietes(this.user.dni).subscribe(data=>{
      this.pendientes = data;
      this.procesando = false;
    });
  }

  pagar(item: CuotaPendiente): void {
    this.dialog
    .open(PassarelaComponent, {
      data: {user: this.user}
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
          //alert('confirmado ' + item.codigo_Prestamo);
          this.apiService.registraPago(item.codigo_Prestamo, item.codigo_cuota).subscribe(data=>{
            if (data == 1){
              this.toastr.info("Se registro el pago", "Aviso");
              this.refrescar();
            }
            else {
              this.toastr.error("No se pudo registrar el pago", "Error");
            }
          });
      }
    });
  }

}
