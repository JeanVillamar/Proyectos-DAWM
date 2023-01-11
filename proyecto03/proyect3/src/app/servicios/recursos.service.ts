import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RecursosService {

  constructor(private http: HttpClient) {
    
   }

  obtenerDatos() {
    return this.http.get("https://finalspaceapi.com/api/v0/character")
  }

  getLocalizacion(){
    return this.http.get("https://finalspaceapi.com/api/v0/location")
  }

  getFrase(){
    return this.http.get("https://finalspaceapi.com/api/v0/quote")
  }

  getEpisodio(){
    return this.http.get("https://finalspaceapi.com/api/v0/episode")
  }
}
