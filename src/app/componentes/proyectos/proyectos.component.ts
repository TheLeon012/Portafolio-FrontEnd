import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proyectos } from 'src/app/models/proyectos';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { ProyectosService } from 'src/app/servicios/proyectos.service';
 


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  
  public proy:Proyectos[]=[];
  public editProyectos:Proyectos | undefined;
  public deleteProyecto:Proyectos | undefined;
 
  constructor(private proyectosService:ProyectosService, public autentication:AutenticacionService){}

  ngOnInit(): void{

    this.getProy();
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
    
    window.addEventListener("load", scroller, false);
    window.addEventListener("scroll", scroller, false);

     
  }

  public getProy():void{
    this.proyectosService.getProy().subscribe({
      next:(Response: Proyectos[]) =>{
        this.proy=Response;
      } 
    })
  }
  
  public onOpenModal(mode:String, proyecto?:Proyectos):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');
    if(mode==='add'){
      button.setAttribute('data-target', '#addProyModal');
    }else if(mode==='delete'){
      this.deleteProyecto=proyecto;
      button.setAttribute('data-target', '#deleteProyModal');
    }else if(mode==='edit'){
      this.editProyectos=proyecto;
      button.setAttribute('data-target', '#editProyModal');
    }

    container?.appendChild(button);
    button.click();
  }
 

  public onAddProyecto(addForm : NgForm): void{
    document.getElementById('add-proyecto-form')?.click();
    this.proyectosService.addExp(addForm.value).subscribe({
      next: (response:Proyectos) =>{
        console.log(response);
        this.getProy();
        addForm.reset();
      } 
    })
  }

  public onUpdateProyecto(proyectos : Proyectos){
    this.editProyectos=proyectos;
    document.getElementById('add-proyecto-form')?.click();
    this.proyectosService.updateExp(proyectos).subscribe({
      next: (response:Proyectos) =>{
        console.log(response);
        this.getProy();
  
      } 
    })
  }

  public onDeleteExperiencias(idProy:number):void{

    this.proyectosService.deleteExp(idProy).subscribe({
      next: (response:void) =>{
        console.log(response);
        this.getProy();
      } 
    })
  }    
}

