import { Component } from '@angular/core';
import { RecursosService } from '../servicios/recursos.service';
import { Frase } from './frase';


@Component({
  selector: 'app-frase',
  templateUrl: './frase.component.html',
  styleUrls: ['./frase.component.css']
})


export class FraseComponent {
  title = 'Frase';
  frase:Frase[] = [];

  
  
  constructor(private recursosService: RecursosService) {
    recursosService.getFrase().subscribe(respuesta => {     
      this.frase = respuesta as Array<Frase>
      console.log(this.frase)
    })
  }  

}
