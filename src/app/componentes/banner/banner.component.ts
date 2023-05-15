import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PortafolioService } from 'src/app/servicios/portafolio.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit{

  public usuario : Usuario | undefined;
  public editUsuario : Usuario | undefined; 
  constructor(private portafolioService : PortafolioService,  public autentication:AutenticacionService){}

  ngOnInit(): void {
    this.getUser();
    /*La siguiente parte de codigo se encarga de realizar el efecto de desvanecer cuando se scrolea*/
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
    window.addEventListener("load", scroller, false);
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
  public onOpenModal(mode:String, user?:Usuario):void{
    // Obtiene el elemento contenedor principal mediante su id.
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');
    if(mode==='add'){
      button.setAttribute('data-target', '#addUserModal');
     
    }else if(mode==='edit'){
      this.editUsuario=user;
      button.setAttribute('data-target', '#editUserModal');
    }
    container?.appendChild(button);
    button.click();
  }
  public onUpdateUser(user: Usuario) {
    // Asigna el usuario recibido al atributo editUsuario de la instancia actual.
    this.editUsuario = user;
    // Obtiene el formulario de agregar usuario y simula un clic en él.
    document.getElementById('add-user-form')?.click();
    // Llama al método updateUsuario(user) del servicio portafolioService
    // y suscribe una función de devolución de llamada para manejar la respuesta exitosa.
    this.portafolioService.updateUsuario(user).subscribe({
      next: (response: Usuario) => {
        // Actualiza los datos de usuario llamando al método getUser().
        this.getUser();
      } 
    });
  }
}
