import { Component, OnInit } from '@angular/core';
import { PortafolioService } from 'src/app/servicios/portafolio.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  cursosLista: any;
  constructor(private datosPorfolio:PortafolioService){}

  ngOnInit(): void{
    this.datosPorfolio.obtenerDatos().subscribe(data=>{
      this.cursosLista=data.cursosJson;
    })
  }
}
