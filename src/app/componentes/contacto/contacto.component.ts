import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contacto } from 'src/app/models/contacto';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { ContactoService } from 'src/app/servicios/contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  public contacto : Contacto []= [];
  public editCont : Contacto | undefined;
  public deleteCont: Contacto | undefined;

 
  constructor(private contactoService : ContactoService, public autentication:AutenticacionService){

  }

  ngOnInit(): void{

    this.getCont();
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

  public getCont():void{
    // Función para obtener los contactos
    this.contactoService.getCont().subscribe({
      next:(Response: Contacto[]) =>{
         // Asignar la respuesta al arreglo de contactos
        this.contacto=Response;
      } 
    })
  }
  public onOpenModal(mode:String, contacto?:Contacto):void{
    // Función para abrir un modal específico según el modo y contacto proporcionados
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');
    if(mode==='add'){
      button.setAttribute('data-target', '#addContModal');
    }else if(mode==='delete'){
      this.deleteCont=contacto;
      button.setAttribute('data-target', '#deleteContModal');
    }else if(mode==='edit'){
      this.editCont=contacto;
      button.setAttribute('data-target', '#editContModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddCont(addForm : NgForm): void{
    // Función para agregar un nuevo contacto
    document.getElementById('add-con-form')?.click();
    this.contactoService.addCont(addForm.value).subscribe({
      next: (response:Contacto) =>{
        this.getCont();
        addForm.reset();
      } 
    })
  }

  public onUpdateContacto(con : Contacto){
     // Función para actualizar
    this.editCont=con;
    document.getElementById('add-con-form')?.click();
    this.contactoService.updateCont(con).subscribe({
      next: (response:Contacto) =>{
        this.getCont();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }
  public onDeleteCont(idCont : number):void{
 // Función para eliminar
    this.contactoService.deleteCont(idCont).subscribe({
      next: (response:void) =>{
        this.getCont();
      } 
    })
  }    
}