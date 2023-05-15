import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Educacion } from 'src/app/models/educacion';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { EducacionService } from 'src/app/servicios/educacion.service';
 
@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  public educacion:Educacion[]=[];
  public editEdu: Educacion | undefined;
  public deleteEdu:Educacion | undefined;
  cursosLista: any;
  constructor(private educationService:EducacionService, public autentication:AutenticacionService){}

  ngOnInit(): void{
    this.getEdu();
    "use strict";
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

  public getEdu():void{
    // Función para obtener los datos
    this.educationService.getEdu().subscribe({
      next:(Response: Educacion[]) =>{
        this.educacion=Response;
      } 
    })
  }


  public onOpenModal(mode:String, educacion?:Educacion):void{
    // Función para abrir un modal específico según el modo y contacto proporcionados
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');
    if(mode==='add'){
      button.setAttribute('data-target', '#addEstudioModal');
    }else if(mode==='delete'){
      this.deleteEdu=educacion;
      button.setAttribute('data-target', '#deleteEstudioModal');
    }else if(mode==='edit'){
      this.editEdu=educacion;
      button.setAttribute('data-target', '#editEstudioModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddEducacion(addForm : NgForm): void{
    // Función para agregar 
    document.getElementById('add-edu-form')?.click();
    this.educationService.addEdu(addForm.value).subscribe({
      next: (response:Educacion) =>{
        this.getEdu();
        addForm.reset();
      } 
    })
  }
  public onUpdateEducacion(educacion : Educacion){
     // Función para actualizar  
    this.editEdu=educacion;
    document.getElementById('add-edu-form')?.click();
    this.educationService.updateEdu(educacion).subscribe({
      next: (response:Educacion) =>{
        this.getEdu();
      } 
    })
  }
  public onDeleteEstudio(idEdu:number):void{
     // Función para eliminar
    this.educationService.deleteEdu(idEdu).subscribe({
      next: (response:void) =>{
        this.getEdu();
      } 
    })
  }    
}