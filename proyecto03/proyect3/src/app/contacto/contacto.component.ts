import { Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
   titulo:string = "INDEX"

   medios:any[] = [
    {"texto":"Characters", "url":"https://www.youtube.com/watch?v=YsPp0vYHlqU&list=RDGMEMJQXQAmqrnmK1SEjY_rKBGA&index=3"},
    {"texto":"Locations", "url":"https://www.youtube.com/watch?v=YsPp0vYHlqU&list=RDGMEMJQXQAmqrnmK1SEjY_rKBGA&index=3"},
    {"texto":"Episodes", "url":"https://www.youtube.com/watch?v=YsPp0vYHlqU&list=RDGMEMJQXQAmqrnmK1SEjY_rKBGA&index=3"}
  ]
}


