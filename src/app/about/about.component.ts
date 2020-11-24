import { Component, OnInit } from '@angular/core';

export interface Alumno {
  nombre: string;
  role: string;
}


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'role'];
  alumnos: Alumno[] = [
    { nombre: 'Sebastian Callan',  role: 'Product Owner'},
    { nombre: 'Richard Aranibar',  role: 'Scrum Master'},
    { nombre: 'Luis Pezo', role: 'Developer' },
    { nombre: 'Franchesco Guccione',  role: 'Developer'},
    { nombre: 'Rafael Orellana',  role: 'Developer'},
    { nombre: 'Zoila Olea',  role: 'Developer'}
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
