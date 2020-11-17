import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Solicitud } from '../shared/solicitud.model';
import { MatDialog } from '@angular/material/dialog';
import { TerminosComponent } from '../terminos/terminos.component';

@Component({
  selector: 'app-solicitar',
  templateUrl: './solicitar.component.html',
  styleUrls: ['./solicitar.component.css']
})
export class SolicitarComponent implements OnInit {
  monto: Number;
  situaciones: [];
  frecuencias: [];

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
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TerminosComponent, {
      width: '400px',
      data: { }
    });

    /*
    dialogRef.afterClosed().subscribe(res => {
      
    });
    */
  }

  solicitar() {
    alert("solictar!");
  }

}
