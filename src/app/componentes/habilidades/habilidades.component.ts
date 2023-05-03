import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Habilidades } from 'src/app/models/habilidades';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { HabilidadesService } from 'src/app/servicios/habilidades.service';
 
@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit{

  public habilidades:Habilidades[]=[];
  public edithabilidades:Habilidades | undefined;
  public deleteSki:Habilidades | undefined;
 
  constructor(private habilidadesService:HabilidadesService, public autentication:AutenticacionService){}

  ngOnInit(): void{

    this.getSkill();
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

  public getSkill():void{
    this.habilidadesService.getSkill().subscribe({
      next:(Response: Habilidades[]) =>{
        this.habilidades=Response;
      } 
    })
  }
  
  public onOpenModal(mode:String, habilidades?:Habilidades):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');
    if(mode==='add'){
      button.setAttribute('data-target', '#addSkillModal');
    }else if(mode==='delete'){
      this.deleteSki=habilidades;
      button.setAttribute('data-target', '#deleteSkillModal');
    }else if(mode==='edit'){
      this.edithabilidades=habilidades;
      button.setAttribute('data-target', '#editSkillModal');
    }

    container?.appendChild(button);
    button.click();
  }
 

  public onAddHabilidades(addForm : NgForm): void{
    document.getElementById('add-habilidades-form')?.click();
    this.habilidadesService.addSkill(addForm.value).subscribe({
      next: (response:Habilidades) =>{
        console.log(response);
        this.getSkill();
        addForm.reset();
      } 
    })
  }

  public onUpdateHabilidades(habilidades : Habilidades){
    this.edithabilidades=habilidades;
    document.getElementById('add-habilidades-form')?.click();
    this.habilidadesService.updateSkill(habilidades).subscribe({
      next: (response:Habilidades) =>{
        console.log(response);
        this.getSkill();
  
      } 
    })
  }

  public onDeleteHabilidades(idSkill : number):void{

    this.habilidadesService.deleteSkill(idSkill).subscribe({
      next: (response:void) =>{
        console.log(response);
        this.getSkill();
      } 
    })
  }    
}
