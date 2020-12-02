import { Component, OnInit } from '@angular/core';

export interface Estado {
  cuota: number;
  importe: number;
  fecha_ven: Date;
  estado: string;
}

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {
  displayedColumns: string[] = ['cuota', 'importe', 'fecha_ven', 'estado'];
  estados: Estado[] = [
    { cuota: 1, importe: 150, fecha_ven: new Date(2020, 8, 31), estado: 'Cancelada' },
    { cuota: 2, importe: 150, fecha_ven: new Date(2020, 9, 30), estado: 'Cancelada' },
    { cuota: 3, importe: 150, fecha_ven: new Date(2020,10, 31), estado: 'Pendiente' },
    { cuota: 4, importe: 150, fecha_ven: new Date(2020,11, 30), estado: 'Pendiente' }
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
