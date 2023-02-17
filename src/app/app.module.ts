import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';
import { CursosComponent } from './componentes/cursos/cursos.component';
import { HabilidadesComponent } from './componentes/habilidades/habilidades.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { BannerComponent } from './componentes/banner/banner.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    AcercaDeComponent,
    CursosComponent,
    HabilidadesComponent,
    ContactoComponent,
    BannerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
