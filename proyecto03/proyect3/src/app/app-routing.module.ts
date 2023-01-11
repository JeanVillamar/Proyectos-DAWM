import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { PersonajeComponent } from './personaje/personaje.component';
import { LocalitationsComponent} from './localitations/localitations.component';


const routes: Routes = [
    { path: "Personaje", component:  PersonajeComponent },
    { path: "Localizacion", component: LocalitationsComponent},
    { path: "**", redirectTo: "Peronaje" }
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
