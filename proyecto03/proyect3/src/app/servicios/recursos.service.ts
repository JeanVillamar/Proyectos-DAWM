import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RecursosService {

  constructor(private http: HttpClient) {


   }

  obtenerDatos() {
    return this.http.get('https://rickandmortyapi.com/api/character')
  }
}
