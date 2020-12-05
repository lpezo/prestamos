import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthenticationService } from '../shared/authentication.service';
import { Cuotas } from '../shared/cuotas.model';
import { User } from '../shared/user.models';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {
  displayedColumns: string[] = ['nro_cuota', 'monto', 'fecha_vencimiento', 'estatus'];
  estados: Cuotas[] = [];
  user: User;
  constructor(
    private apiService: ApiService,
    private authenticate: AuthenticationService
    ) { }

  ngOnInit(): void {
    this.user = this.authenticate.currentUserValue;
    this.apiService.getEstadoCuotas(this.user.dni).subscribe(data=>{
      this.estados = data.map(v=>{
        if (v.estatus == 'C')
          v['estado_nombre'] = 'Cancelado';
        else if (v.estatus == 'P')
          v['estado_nombre'] = 'Pendiente';
        else
          v['estado_nombre'] = v.estatus;
        return v;
      });
      console.log('estados:', this.estados);
    })
  }

}
