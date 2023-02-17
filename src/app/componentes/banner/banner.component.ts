import { Component, OnInit } from '@angular/core';
import { PortafolioService } from 'src/app/servicios/portafolio.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit{

  miPorfolio:any;
  constructor(private datosPortafolio: PortafolioService){

  }
  ngOnInit(): void {
    this.datosPortafolio.obtenerDatos().subscribe(data =>{console.log(data);
        this.miPorfolio=data;
    });
  }
}
