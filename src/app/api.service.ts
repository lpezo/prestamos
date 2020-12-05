import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { of } from 'rxjs';
import { Solicitud } from './shared/solicitud.model';
import { Registro } from './shared/registro.model';
import { Cuotas } from './shared/cuotas.model';
import { CuotaPendiente } from './shared/cuotaPendiente.model';

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

  public acceptSolicitud(choise: number, id: number, dni: string) {
    return this.httpClient.put(this.SERVER_EXT + "solicitudPut/actualizarEstatusSolicitud", {choise, id, dni});
  }

  public registrarPrestamo(id: number, dni: string) {
    return this.httpClient.post(this.SERVER_EXT + 'PrestamoPost/registro', {id, dni});
  }

  public saveRegistro(registro: Registro) {
    return this.httpClient.post(this.SERVER_EXT + "clientesPost/registrarCliente", registro);
  }

  public sendInterbancario(data: any) {
    return this.httpClient.put(this.SERVER_EXT + "clientePut/registrarCuentaInterbancaria", data);
  }
  
  public getPrestamos() {
    return this.httpClient.get<any[]>(this.SERVER_EXT + "PrestamoGet/prestamosPorDesembolsar");
  }

  public postPrestamo(codigo_Prestamo: string, cuenta_bancaria: string) {
    return this.httpClient.post(this.SERVER_EXT + "PrestamoPost/DesembolsarPrestamo", {codigo_Prestamo, cuenta_bancaria});
  }
  
  public getEstadoCuotas(dni: string) {
    return this.httpClient.get<Cuotas[]>(this.SERVER_EXT + "cuotasGet/cuotas/" + dni);
  }

  public getCuotaPendietes(dni: string) {
    return this.httpClient.get<CuotaPendiente[]>(this.SERVER_EXT + "cuotasGet/cuotasPendientesPago/" + dni);
  }

  public registraPago(codigo_Prestamo: string, codigo_cuota: number) {
    return this.httpClient.put(this.SERVER_EXT + "cuotaPut/registrarPagoCuota", {codigo_Prestamo, codigo_cuota});
  }

}
