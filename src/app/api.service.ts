import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_URL = environment.API;
  
  constructor(private httpClient: HttpClient) { }

  public getMontos(){  
    if (environment.production)
      return this.httpClient.get(this.SERVER_URL + "montos");
    return of(environment.montos);
	}  
  public getCuotas(){  
    if (environment.production)
      return this.httpClient.get(this.SERVER_URL + "cuotas");
    return of(environment.cuotas);
  }  
  
  public calcular(monto: number, cuota: number){
    let obj = {items: [], total: 0};
    if (monto == undefined || cuota == undefined)
      return of(obj);
    let items = [];
    let cadamonto = monto / cuota * 1.2; 
    let total = 0;
    for (let i = 0; i < cuota; i++){
      items.push({num: i+1, cuota: cadamonto});
      total = total + cadamonto;
    }
    obj = {items: items, total: total};
    return of(obj);
  }

}
