import { Component} from '@angular/core';
 

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent    {

 
  constructor( ){

  }
   
  toacerde(){
    document.getElementById("acercade")?.scrollIntoView();

  }
  toexp(){
    document.getElementById("exp")?.scrollIntoView();

  }
  toskill(){
    document.getElementById("skill")?.scrollIntoView();

  }
  toedu(){
    document.getElementById("edu")?.scrollIntoView();

  }
  tocontact(){
    document.getElementById("contact")?.scrollIntoView();

  }
 



}
