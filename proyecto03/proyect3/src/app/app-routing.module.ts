import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { PersonajeComponent } from './personaje/personaje.component';
import { LocalitationsComponent} from './localitations/localitations.component';
import { FraseComponent } from './frase/frase.component';
import { EpisodioComponent } from './episodio/episodio.component';



const routes: Routes = [
    { path: "Personaje", component:  PersonajeComponent },
    { path: "Localizacion", component: LocalitationsComponent},
    { path: "Frase", component: FraseComponent},
    { path: "Episodio", component: EpisodioComponent},
    { path: "**", redirectTo: "Peronaje" }
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
