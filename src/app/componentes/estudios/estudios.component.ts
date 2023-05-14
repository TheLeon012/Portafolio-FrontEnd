import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cursos } from 'src/app/models/cursos';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { CursosService } from 'src/app/servicios/cursos.service';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css']
})
export class EstudiosComponent {

  public cursos:Cursos[]=[];
  public editCurso: Cursos | undefined;
  public deleteCurso:Cursos | undefined;

  constructor(private cursosService:CursosService, public autentication:AutenticacionService){}

  ngOnInit(): void{

    this.getCurso();
    
 

  }

  public getCurso():void{
    this.cursosService.getCurso().subscribe({
      next:(Response: Cursos[]) =>{
        this.cursos=Response;
      } 
    })
  }


  public onOpenModal(mode:String, cursos?:Cursos):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');
    if(mode==='add'){
      button.setAttribute('data-target', '#addCursoModal');
    }else if(mode==='delete'){
      this.deleteCurso=cursos;
      button.setAttribute('data-target', '#deleteCursoModal');
    }else if(mode==='edit'){
      this.editCurso=cursos;
      button.setAttribute('data-target', '#editCursoModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddCurso(addForm : NgForm): void{
    document.getElementById('add-cursos-form')?.click();
    this.cursosService.addCurso(addForm.value).subscribe({
      next: (response:Cursos) =>{
        console.log(response);
        this.getCurso();
        addForm.reset();
        window.location.reload();
        this.autentication.estaLogueado = true;
        
      } 
    })
  }

  
  public onUpdateCurso(cursos : Cursos){
    this.editCurso=cursos;
    document.getElementById('add-cursos-form')?.click();
    this.cursosService.updateCurso(cursos).subscribe({
      next: (response:Cursos) =>{
        console.log(response);
        this.getCurso();
        window.location.reload();
        this.autentication.estaLogueado = true;
  
      } 
    })
  }

  public onDeleteCurso(idCurso:number):void{

    this.cursosService.deleteCurso(idCurso).subscribe({
      next: (response:void) =>{
        console.log(response);
        this.getCurso();
        window.location.reload();
        this.autentication.estaLogueado = true;
      } 
    })
  }    
}
