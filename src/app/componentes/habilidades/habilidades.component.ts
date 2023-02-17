import { Component, OnInit } from '@angular/core';
import { PortafolioService } from 'src/app/servicios/portafolio.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit{

  SkillsLista: any;
  constructor(private datosPorfolio:PortafolioService){}

  ngOnInit(): void{
    this.datosPorfolio.obtenerDatos().subscribe(data=>{
      this.SkillsLista=data.habilidadesJson;
    })
  }

}
