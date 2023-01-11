import { Component } from '@angular/core';
import { Episodio } from './episodio';
import { RecursosService } from '../servicios/recursos.service';

@Component({
  selector: 'app-episodio',
  templateUrl: './episodio.component.html',
  styleUrls: ['./episodio.component.css']
})
export class EpisodioComponent {

  title = 'Episodios';
  episodio:Episodio[] = [];

  constructor(private recursosService: RecursosService) {
    recursosService.getEpisodio().subscribe(respuesta => {     
      this.episodio = respuesta as Array<Episodio>
      console.log(this.episodio)
      
    })
  }  

}
