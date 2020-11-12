import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_URL = "https://us-central1-prestaaltoke.cloudfunctions.net/app/api/";
  
  constructor(private httpClient: HttpClient) { }

  public getMontos(){  
		return this.httpClient.get(this.SERVER_URL + "montos");
	}  
  public getCuotas(){  
		return this.httpClient.get(this.SERVER_URL + "cuotas");
	}  
}
