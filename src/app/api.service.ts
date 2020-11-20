import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { of } from 'rxjs';
import { Solicitud } from './shared/solicitud.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_EXT = environment.API;
  private SERVER_URL = environment.API_INI;
  
  constructor(private httpClient: HttpClient) { }

  public getMontos(){  
    return this.httpClient.get(this.SERVER_URL + "montos");
	}  
  public getCuotas(){  
    return this.httpClient.get(this.SERVER_URL + "cuotas");
  }

  public getSituaciones() {
    return this.httpClient.get(this.SERVER_URL + "SituacionLaboral");
  }

  public getFrecuencias() {
    return this.httpClient.get(this.SERVER_URL + "FrecuenciaIngresos");
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

  public saveSolicitud(solicitud: Solicitud) {
    return this.httpClient.post(this.SERVER_EXT + "SolicitudPost/registro", solicitud);
  }

}
