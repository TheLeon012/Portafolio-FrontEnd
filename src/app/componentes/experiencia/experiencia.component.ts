import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Experiencias } from 'src/app/models/experiencias';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { ExperienciasService } from 'src/app/servicios/experiencias.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit{
  
  public exper:Experiencias[]=[];
  public editExperiencias:Experiencias | undefined;
  public deleteExperiencias:Experiencias | undefined;
 
  constructor(private experienciasService:ExperienciasService, public autentication:AutenticacionService){}

  ngOnInit(): void{

    this.getExp();
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
  public getExp():void{
  // Función para obtener los datos
    this.experienciasService.getExp().subscribe({
      next:(Response: Experiencias[]) =>{
        this.exper=Response;
      } 
    })
  }
  public onOpenModal(mode:String, experiencias?:Experiencias):void{
    // Función para abrir un modal específico según el modo y contacto proporcionados
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');
    if(mode==='add'){
      button.setAttribute('data-target', '#addExpModal');
    }else if(mode==='delete'){
      this.deleteExperiencias=experiencias;
      button.setAttribute('data-target', '#deleteExpModal');
    }else if(mode==='edit'){
      this.editExperiencias=experiencias;
      button.setAttribute('data-target', '#editExpModal');
    }
    container?.appendChild(button);
    button.click();
  }
  public onAddExperiencias(addForm : NgForm): void{
     // Función para agregar 
    document.getElementById('add-experiencias-form')?.click();
    this.experienciasService.addExp(addForm.value).subscribe({
      next: (response:Experiencias) =>{
        this.getExp();
        addForm.reset();
      } 
    })
  }
  public onUpdateExperiencias(experiencias : Experiencias){
    // Función para actualizar
    this.editExperiencias=experiencias;
    document.getElementById('add-experiencias-form')?.click();
    this.experienciasService.updateExp(experiencias).subscribe({
      next: (response:Experiencias) =>{
        this.getExp();
      } 
    })
  }
  public onDeleteExperiencias(idExp : number):void{
// Función para eliminar
    this.experienciasService.deleteExp(idExp).subscribe({
      next: (response:void) =>{
        this.getExp();
      } 
    })
  }    
}

