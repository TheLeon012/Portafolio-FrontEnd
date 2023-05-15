import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PortafolioService } from 'src/app/servicios/portafolio.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent {

  public usuario : Usuario | undefined;
  public editUsuario : Usuario | undefined;
  isSubrayado: boolean = false;
  constructor(private portafolioService : PortafolioService, 
    public autentication:AutenticacionService){

  }
  ngOnInit(): void {
    this.getUser();
    "use strict";
     /*La siguiente parte de codigo se encarga de realizar el efecto de desvanecer cuando se scrolea*/
    let boxes = Array.from(document.querySelectorAll(".desvanecer"));
    let scroller = () => {
      boxes.forEach(desvanecer => {
        if (desvanecer.getBoundingClientRect().top < window.innerHeight) {
          desvanecer.classList.add("inView") 
          this.isSubrayado=true;
        } else {
          desvanecer.classList.remove("inView")
          this.isSubrayado=false;
        }
      });
    };
    
    window.addEventListener("scroll", scroller, false);
    
  }

  public getUser():void{
    // Obtiene el usuario utilizando el servicio portafolioService
    // y suscribe una función de devolución de llamada para manejar la respuesta exitosa.
    this.portafolioService.getUser().subscribe({
      next: (response: Usuario) =>{
         // Asigna la respuesta recibida a la variable usuario de la instancia actual.
        this.usuario=response;
      } 
    })
  }

  public onUpdateAcercade(usuario : Usuario){
    // Asigna el usuario recibido al atributo editUsuario de la instancia actual.
    this.editUsuario=usuario;
    // Obtiene el formulario de agregar usuario y simula un clic en él.
    document.getElementById('add-Acercade-form')?.click();
    // Llama al método updateUsuario(user) del servicio portafolioService
    // y suscribe una función de devolución de llamada para manejar la respuesta exitosa.
    this.portafolioService.updateUsuario(usuario).subscribe({
      next: (response:Usuario) =>{
         // Actualiza los datos de usuario llamando al método getUser().
        this.getUser();
  
      } 
    })
  }
 
}

 
 


