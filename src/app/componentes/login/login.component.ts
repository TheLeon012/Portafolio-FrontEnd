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
      // Se construye el formulario utilizando el formBuilder
    this.form=this.formBuilder.group(
      {
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required, Validators.minLength(9)]]
      }
    )
  }
  ngOnInit(): void {
    // Se llama a la función para obtener los datos del usuario al inicializar el componente
    this.getUser();
  }
  
  public getUser():void{
    // Se llama al servicio portafolioService para obtener los datos del usuario
    this.portafolioService.getUser().subscribe({
      next: (response: Usuario) =>{
        this.usuario=response;
      } 
    })
  }

  get Email(){
    // Getter para obtener el campo de email del formulario
    return this.form.get('email');
  }
  get Password(){
    // Getter para obtener el campo de contraseña del formulario
    return this.form.get('password');
  }
  onEnviar(event: Event)
  {
    event.preventDefault;
  // Se previene el comportamiento por defecto del evento
  // Se llama al servicio autenticationService para iniciar sesión utilizando los valores del formulario
    this.autenticationService.IniciarSesion(this.form.value).subscribe(data=>{
      this.ruta.navigate(['']);// Se redirige al usuario a la página principal después de iniciar sesión
    })
  }
}
