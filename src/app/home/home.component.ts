import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  montos = [];
  cuotas = [];

  selectedMonto: string;
  selectedCuota: string;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.get().subscribe((data: any)=>{  
      console.log(data);
      this.montos = data.montos;
      this.cuotas = data.cuotas;
		})
  }

}
