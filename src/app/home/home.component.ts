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
  itemscalc = [];
  itemstotal : number = 0;
  selectedMonto: number;
  selectedCuota: number;
  
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getMontos().subscribe((data: any)=>{  
      this.montos = data;
    })
    this.apiService.getCuotas().subscribe((data: any)=>{  
      this.cuotas = data;
    })
    
  }

  calcular() {
    this.apiService.calcular(this.selectedMonto, this.selectedCuota).subscribe((data: any)=>{
      this.itemscalc = data.items;
      this.itemstotal = data.total;
    })
  }

}
