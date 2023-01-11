import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VerfraseComponent } from "./componentes/verfrase/verfrase.component"; // <----

@NgModule({
  declarations: [VerfraseComponent],
  imports: [CommonModule],
  exports: [VerfraseComponent] // <----- Componente para visualizar la frase
})
export class ChuckModule {}
