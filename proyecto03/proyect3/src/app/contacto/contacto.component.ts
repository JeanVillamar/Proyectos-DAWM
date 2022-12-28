import { Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
   titulo:string = "Contáctame"

   medios:any[] = [
    {"texto":"En Twitter"},
    {"texto":"En Facebook"},
    {"texto":"Por correo electrónico"}
  ]
}
