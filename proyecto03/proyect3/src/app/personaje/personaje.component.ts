import { Component } from '@angular/core';
import { Personaje } from './personaje';
import { RecursosService } from '../servicios/recursos.service';

@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.component.html',
  styleUrls: ['./personaje.component.css']
})

export class PersonajeComponent {
  title = 'Personaje';
  personaje:Personaje[] = [];

  
  
  constructor(private recursosService: RecursosService) {
    recursosService.obtenerDatos().subscribe(respuesta => {     
      this.personaje = respuesta as Array<Personaje>
      console.log(respuesta)
    })
  }  
}
