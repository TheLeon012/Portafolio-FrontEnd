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
    this.experienciasService.getExp().subscribe({
      next:(Response: Experiencias[]) =>{
        this.exper=Response;
      } 
    })
  }
  
  public onOpenModal(mode:String, experiencias?:Experiencias):void{
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
    document.getElementById('add-experiencias-form')?.click();
    this.experienciasService.addExp(addForm.value).subscribe({
      next: (response:Experiencias) =>{
        console.log(response);
        this.getExp();
        addForm.reset();
      } 
    })
  }

  public onUpdateExperiencias(experiencias : Experiencias){
    this.editExperiencias=experiencias;
    document.getElementById('add-experiencias-form')?.click();
    this.experienciasService.updateExp(experiencias).subscribe({
      next: (response:Experiencias) =>{
        console.log(response);
        this.getExp();
  
      } 
    })
  }

  public onDeleteExperiencias(idExp : number):void{

    this.experienciasService.deleteExp(idExp).subscribe({
      next: (response:void) =>{
        console.log(response);
        this.getExp();
      } 
    })
  }    
}

