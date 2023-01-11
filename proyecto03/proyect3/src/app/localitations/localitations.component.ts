import { Component } from '@angular/core';

import { Localizacion } from './localizacion';
import { RecursosService } from '../servicios/recursos.service';


@Component({
  selector: 'app-localitations',
  templateUrl: './localitations.component.html',
  styleUrls: ['./localitations.component.css']
})

export class LocalitationsComponent {
  title = 'Localizacion';
  localizacion:Localizacion[] = [];

  
  
  constructor(private recursosService: RecursosService) {
    recursosService.getLocalizacion().subscribe(respuesta => {     
      this.localizacion = respuesta as Array<Localizacion>
      console.log(this.localizacion)
      
    })
  }  

}
