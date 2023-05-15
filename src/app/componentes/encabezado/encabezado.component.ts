import { Component, OnInit} from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
 

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent {
  constructor(public autentication:AutenticacionService ){
  }

  ngOnInit(){
    window.addEventListener("scroll", function(){
      var nav = document.querySelector("nav");
      nav?.classList.toggle("abajo", window.scrollY>600)
    })
  }
  // Fucniones para desplazarse a cada sección
  toacerde(){
    document.getElementById("acercade")?.scrollIntoView();
  }
  toexp(){
    document.getElementById("exp")?.scrollIntoView();
  }
  toskill(){
    document.getElementById("skill")?.scrollIntoView();
  }
  toedu(){
    document.getElementById("edu")?.scrollIntoView();
  }
  tocontact(){
    document.getElementById("contact")?.scrollIntoView();
  }

  toproyect(){
    document.getElementById("proyectos")?.scrollIntoView();
  }
}
