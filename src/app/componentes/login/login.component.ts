import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PortafolioService } from 'src/app/servicios/portafolio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public usuario : Usuario | undefined;
   
  
  form:FormGroup;
  constructor(private formBuilder:FormBuilder, 
    private autenticationService:AutenticacionService, 
    private ruta:Router, private portafolioService : PortafolioService)
    {
    this.form=this.formBuilder.group(
      {
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required, Validators.minLength(9)]]
      }
    )

  }
  ngOnInit(): void {
    this.getUser();
     
  }
  
  public getUser():void{
    this.portafolioService.getUser().subscribe({
      next: (response: Usuario) =>{
        this.usuario=response;
      } 
    })
  }
 
 

  get Email(){
    return this.form.get('email');
  }
  get Password(){
    return this.form.get('password');
  }

  onEnviar(event: Event)
  {
    event.preventDefault;
    this.autenticationService.IniciarSesion(this.form.value).subscribe(data=>{
      console.log("DATA:" + JSON.stringify(data));
      this.ruta.navigate(['']);

    })
  }

}
