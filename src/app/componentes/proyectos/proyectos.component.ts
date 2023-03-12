import { Component, OnInit } from '@angular/core';
import { PortafolioService } from 'src/app/servicios/portafolio.service';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  ProyecLista: any;
  constructor(private datosPorfolio:PortafolioService){}

  ngOnInit(): void{
    this.datosPorfolio.obtenerDatos().subscribe(data=>{
      this.ProyecLista=data.proyectosJson;
    })
  }

}
