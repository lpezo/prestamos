import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

export interface Desembolso {
  cliente: string;
  estado: string;
  cuenta_bancaria: string;
  monto: number;
  codigo_Prestamo: string;
  estado_Nombre: string;
}


@Component({
  selector: 'app-desembolso',
  templateUrl: './desembolso.component.html',
  styleUrls: ['./desembolso.component.css']
})
export class DesembolsoComponent implements OnInit {

  desembolsos: Desembolso[] = [];
  displayedColumns: string[] = ['cliente', 'codigo_Prestamo', 'estado', 'monto', 'action'];
  procesando: Boolean = true;

  constructor(private apiService: ApiService, public dialog: MatDialog, ) { }

  ngOnInit(): void {
    this.refrescar();
  }

  refrescar(): void {
    this.procesando = true;
    this.apiService.getPrestamos().subscribe(data=>{
      this.desembolsos = data.map(v=>{
        if (v.estado == 'A')
          v['estado_Nombre'] = 'Aprobado';
        else
          v['estado_Nombre'] = 'No Aprobado';
        return v;
      });
      this.procesando = false;
    });
  }

  procesar(desembolso: Desembolso) {
    //alert("Procesando " + codigo + "...");
    this.apiService.postPrestamo(desembolso.codigo_Prestamo, desembolso.cuenta_bancaria).subscribe(data=>{
      this.dialog
      .open(DialogConfirmComponent, {
        data: {num: 1, message: data==1 ? 'Se realizó el desembolso satisfactoriamente' : 'No se pudo realizar el desembolso'}
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        this.refrescar();
      });
    });
  }
}
