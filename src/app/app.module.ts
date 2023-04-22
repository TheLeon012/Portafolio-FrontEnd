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
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { HomeComponent } from './componentes/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EstudiosComponent } from './componentes/estudios/estudios.component';

const appRoutes: Routes=[
  {path:'', component:HomeComponent},
  {path:'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    AcercaDeComponent,
    CursosComponent,
    HabilidadesComponent,
    ContactoComponent,
    BannerComponent,
    ExperienciaComponent,
    ProyectosComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent,
    EstudiosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
