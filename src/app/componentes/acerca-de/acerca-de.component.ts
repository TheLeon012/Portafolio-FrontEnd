import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { PortafolioService } from 'src/app/servicios/portafolio.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent {

  public usuario : Usuario | undefined;
  public editUsuario : Usuario | undefined;

  constructor(private portafolioService : PortafolioService){

  }

  ngOnInit(): void {
    this.getUser();
    "use strict";

    let boxes = Array.from(document.querySelectorAll(".desvanecer"));
    
    let scroller = () => {
      boxes.forEach(desvanecer => {
        if (desvanecer.getBoundingClientRect().top < window.innerHeight) {
          desvanecer.classList.add("inView");
        } else {
          desvanecer.classList.remove("inView");
        }
      });
    };
    
    window.addEventListener("scroll", scroller, false);
    
  }

  public getUser():void{
    this.portafolioService.getUser().subscribe({
      next: (response: Usuario) =>{
        this.usuario=response;
      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message);
      }
    })
  }

  public onUpdateAcercade(usuario : Usuario){
    this.editUsuario=usuario;
    document.getElementById('add-Acercade-form')?.click();
    this.portafolioService.updateUsuario(usuario).subscribe({
      next: (response:Usuario) =>{
        console.log(response);
        this.getUser();
  
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
 
      }
    })
  }
 
}

 
 


