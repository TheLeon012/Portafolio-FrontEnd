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

 
  constructor(private portafolioService : PortafolioService,  public autentication:AutenticacionService){

  }

  ngOnInit(): void {
    this.getUser();
    
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
    this.portafolioService.getUser().subscribe({
      next: (response: Usuario) =>{
        this.usuario=response;
 

      },
      error:(error:HttpErrorResponse) =>{
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode:String, user?:Usuario):void{
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

  public onUpdateUser(user : Usuario){
    this.editUsuario=user;
    document.getElementById('add-user-form')?.click();
    this.portafolioService.updateUsuario(user).subscribe({
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
