import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthenticationService } from '../shared/authentication.service';
import { User } from '../shared/user.models';

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
  currentUser: User;

  constructor(private apiService: ApiService, private authenticate: AuthenticationService) 
  { 
    this.authenticate.currentUser.subscribe(x => this.currentUser = x);
  }

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

  asociar() {
    alert("Asociar");
  }

}
