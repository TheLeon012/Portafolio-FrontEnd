import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contacto } from 'src/app/models/contacto';
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

 
  constructor(private contactoService : ContactoService){

  }

  ngOnInit(): void{

    this.getCont();
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

  public getCont():void{
    this.contactoService.getCont().subscribe({
      next:(Response: Contacto[]) =>{
        this.contacto=Response;
      },
      error:(error: HttpErrorResponse) =>{
        alert(error.message);
      }
    })
  }
  public onOpenModal(mode:String, contacto?:Contacto):void{
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
    document.getElementById('add-con-form')?.click();
    this.contactoService.addCont(addForm.value).subscribe({
      next: (response:Contacto) =>{
        console.log(response);
        this.getCont();
        addForm.reset();
      },
      error:(error: HttpErrorResponse) =>{
        alert(error.message);
        addForm.reset();
      }
    })
  }

  public onUpdateContacto(con : Contacto){
    this.editCont=con;
    document.getElementById('add-con-form')?.click();
    this.contactoService.updateCont(con).subscribe({
      next: (response:Contacto) =>{
        console.log(response);
        this.getCont();
  
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
 
      }
    })
  }
  public onDeleteCont(idCont : number):void{

    this.contactoService.deleteCont(idCont).subscribe({
      next: (response:void) =>{
        console.log(response);
        this.getCont();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }    
}