import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proyectos } from '../models/proyectos';
 
 
@Injectable({
    providedIn: 'root'
})

export class ProyectosService {
    private apiServerUrl=environment.apiBaseUrl;
  
    constructor(private http:HttpClient ) { }
  
    public getProy():Observable<Proyectos[]>{
      return this.http.get<Proyectos[]>(`${this.apiServerUrl}/api/proyecto/all`);

    }

    public addExp(proyectos: Proyectos): Observable<Proyectos>{
        return this.http.post<Proyectos>(`${this.apiServerUrl}/proyecto/add`, proyectos);
    }

    public updateExp(proyectos: Proyectos): Observable<Proyectos>{
        return this.http.put<Proyectos>(`${this.apiServerUrl}/proyecto/update`, proyectos);
    }
    public deleteExp(idProy: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/proyecto/delete/${idProy}`);
    }
  
     
}
  
