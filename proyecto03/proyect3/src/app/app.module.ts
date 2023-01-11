import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactoComponent } from './contacto/contacto.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { PersonajeComponent } from './personaje/personaje.component';
import { LocalitationsComponent } from './localitations/localitations.component';
import { FraseComponent } from './frase/frase.component';
import { EpisodioComponent } from './episodio/episodio.component';



@NgModule({
  declarations: [
    AppComponent,
    ContactoComponent,
    PersonajeComponent,
    LocalitationsComponent,
    FraseComponent,
    EpisodioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
