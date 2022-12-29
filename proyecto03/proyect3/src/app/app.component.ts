import { Component } from '@angular/core';
import { RecursosService } from './servicios/recursos.service';
import { Foto } from './interfaz/foto';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyect3';
  fotos: Foto[] = [];  

  constructor(private recursosService: RecursosService) {
    	
    recursosService.obtenerDatos().subscribe(respuesta => {
      this.fotos = respuesta as Array<Foto>
    })
  }

}


